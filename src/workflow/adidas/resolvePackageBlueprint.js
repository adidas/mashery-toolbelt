const findOne = require('../../mashery/findOne')
const dumpPackage = require('../../mashery/dumpPackage')

/**
 * Resolves blueprint and returns whole structure:
 * package -> plan -> service -> endpoint -> method
 *
 * @param {Object} blueprint
 * @returns {Promise<Object,Error>} package
 */
async function resolvePackageBlueprint (blueprint) {
  const bpOrganization = blueprint.organization
  const organization = await findOne(
    'organization',
    bpOrganization.id || bpOrganization.name || bpOrganization,
    { fields: ['id', 'name', 'description', 'parent'] }
  )

  let persistedPackage = await findOne(
    'package',
    { name: blueprint.package.name },
    { optional: true }
  )

  if (persistedPackage) {
    return resolveExistingPackage(persistedPackage.id, blueprint, organization)
  }

  return {
    package: {
      ...(await resolveNewPackage(blueprint)),
      organization
    }
  }
}

/**
 * Create structure for new package
 *
 * @param {Object} blueprint
 * @returns {Promise<Object,Error>}
 */
async function resolveNewPackage (blueprint) {
  return {
    ...blueprint.package,
    plans: await Promise.all(blueprint.plans.map(resolveNewPlan))
  }
}

/**
 * Create structure for new plan
 *
 * @param {Object} plan
 * @returns {Promise<Object,Error>}
 */
async function resolveNewPlan (plan) {
  return {
    ...plan,
    services: await Promise.all(plan.services.map(resolveService))
  }
}

/**
 * Dump package and merge data with new from blueprint
 *
 * @param {string} packageId
 * @param {Object} blueprint
 * @param {Object} organization
 * @returns {Promise<Object,Error>}
 * @property {Object} persisted is current package dump
 * @property {Object} package is new version
 */
async function resolveExistingPackage (packageId, blueprint, organization) {
  const dump = await dumpPackage(packageId)

  return {
    persisted: dump.package,
    package: {
      ...dump.package,
      ...blueprint.package,
      organization,
      plans: await Promise.all(
        blueprint.plans.map(plan =>
          resolveExistingPlan(plan, dump.package.plans)
        )
      )
    }
  }
}

/**
 * Merge existing plans with data from blueprint
 *
 * @param {Object} plan
 * @param {Array<Object>} persistedPlans
 * @returns {Promise<Object,Error>}
 */
async function resolveExistingPlan (plan, persistedPlans) {
  const foundPlan = persistedPlans.find(
    persistedPlan => persistedPlan.name === plan.name
  )

  return {
    ...foundPlan,
    ...plan,
    services: await Promise.all(plan.services.map(resolveService))
  }
}

const SERVICE_FIELDS = {
  fields: ['id', 'name'],
  endpoints: {
    fields: ['id', 'name', 'undefinedMethodsAllowed'],
    methods: ['id', 'name']
  }
}

/**
 * Fill plan designer structure with real services, endpoints and methods
 *
 * @param {Object} service
 * @returns {Promise<Object,Error>} service
 */
async function resolveService (service) {
  const { id, name, endpoints, methods } = service
  const foundService = await findOne(
    'service',
    { id, name },
    { fields: SERVICE_FIELDS }
  )

  return {
    ...foundService,
    endpoints: resolveEndpoints(endpoints, methods, foundService.endpoints)
  }
}

/**
 * Resolve endpoints in service
 *
 * @param {Array<Object>} planEndpoints
 * @param {string|Array<string|Object>} serviceMethods
 * @param {Array<Object>} persistedEndpoints
 * @returns {Object}
 */
function resolveEndpoints (planEndpoints, serviceMethods, persistedEndpoints) {
  if (planEndpoints === '*') {
    return persistedEndpoints.map(endpoint => ({
      undefinedMethodsAllowed: true, // Default value. TODO: solve better
      ...endpoint,
      methods: resolveMethods(
        endpoint.methods || serviceMethods,
        serviceMethods
      )
    }))
  } else {
    return planEndpoints.map(endpoint =>
      resolveEndpoint(
        endpoint,
        endpoint.methods || serviceMethods,
        persistedEndpoints
      )
    )
  }
}

/**
 * Resolve endpoint in service
 *
 * @param {Object} planEndpoint
 * @param {string|Array<string|Object>} methods
 * @param {Array<Object>} persistedEndpoints
 * @returns {Object}
 */
function resolveEndpoint (planEndpoint, methods, persistedEndpoints) {
  const persistedEndpoint = persistedEndpoints.find(
    ({ id, name }) => planEndpoint.id === id || planEndpoint.name === name
  )

  if (!persistedEndpoint) {
    const query = JSON.stringify({
      id: planEndpoint.id,
      name: planEndpoint.name
    })
    throw new Error(`found no endpoint with query '${query}'`)
  }

  return {
    ...persistedEndpoint,
    ...planEndpoint,
    methods: resolveMethods(methods, persistedEndpoint.methods)
  }
}

/**
 * Resolve methods in endpoint
 *
 * @param {string|Array<string|Object>} planMethods
 * @param {any} persistedMethods
 * @returns
 */
function resolveMethods (planMethods, persistedMethods) {
  if (!planMethods) {
    return []
  }

  if (planMethods === '*') {
    return persistedMethods
  }

  return planMethods.map(planMethod => {
    const persistedMethod = persistedMethods.find(
      ({ id, name }) =>
        planMethod.name === name || planMethod.id === id || planMethod === name
    )

    if (!persistedMethod) {
      const query = JSON.stringify(planMethod)
      throw new Error(`found no method with query '${query}'`)
    }

    return persistedMethod
  })
}

module.exports = resolvePackageBlueprint
