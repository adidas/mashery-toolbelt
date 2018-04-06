const isObject = require('isobject')
const pluralize = require('pluralize')
const clientErrorMessages = require('./error_messages')
const { RequestError } = require('./errors')

function validateFields (methodName, allFields, fields) {
  const invalidFields = []

  fields.forEach(field => {
    if (!allFields.includes(field)) {
      invalidFields.push(field)
    }
  })

  if (invalidFields.length > 0) {
    throw new RequestError(
      'invalid_fields',
      clientErrorMessages.invalid_field(methodName, invalidFields)
    )
  }

  return fields
}

function collectFieldsFromObject (methodName, entityName, fields) {
  const allFields = entityFields[entityName]
  const { all, only, except, ...nested } = fields
  let collectedFields = []

  if (except) {
    const exceptFields = typeof except === 'string' ? except.split(',') : except
    validateFields(methodName, allFields, exceptFields)
    collectedFields = allFields.filter(field => !exceptFields.includes(field))
  } else if (all || only) {
    collectedFields = collectFields(methodName, entityName, all || only)
  }

  // Iterate over nested associations
  Object.keys(nested).forEach(nestedEntityName => {
    const pluralEntityName = pluralize.plural(nestedEntityName)
    const singularEntityName = pluralize.singular(nestedEntityName)

    // Check if nested association is valid
    if (!allFields.includes(pluralEntityName)) {
      throw new RequestError(
        'invalid_fields',
        clientErrorMessages.invalid_field(methodName, [
          `${entityName}.${nestedEntityName}`
        ])
      )
    }

    // Remove nested association when is presented as single field
    const nestedFieldIndex = collectedFields.findIndex(
      field => field === pluralEntityName
    )
    if (nestedFieldIndex > -1) {
      collectedFields.splice(nestedFieldIndex, 1)
    }

    // Recursively grap fields for nested association(s)
    const nestedFields = collectFields(
      methodName,
      singularEntityName,
      nested[nestedEntityName]
    ).map(nestedField => `${pluralEntityName}.${nestedField}`)
    collectedFields.push(...nestedFields)
  })

  return collectedFields
}

function collectFields (methodName, entityName, fields) {
  const allFields = entityFields[entityName]

  if (fields === true || fields === 'all') {
    return allFields
  } else if (typeof fields === 'string') {
    return validateFields(methodName, allFields, fields.split(','))
  } else if (Array.isArray(fields)) {
    return validateFields(methodName, allFields, fields)
  } else if (isObject(fields)) {
    return collectFieldsFromObject(methodName, entityName, fields)
  } else {
    return null
  }
}

function makeFieldsParam (methodName, entityName, fields) {
  return collectFields(methodName, entityName, fields).join(',')
}

const organization = [
  'id',
  'name',
  'parent',
  'suborganizations',
  'description',
  'created',
  'updated'
]

const service = [
  'id',
  'name',
  'description',
  'created',
  'updated',
  'endpoints',
  'editorHandle',
  'revisionNumber',
  'robotsPolicy',
  'crossdomainPolicy',
  'errorSets',
  'qpsLimitOverall',
  'rfc3986Encode',
  'securityProfile',
  'version',
  'organization'
]

const endpoint = [
  'id',
  'methods',
  'allowMissingApiKey',
  'apiKeyValueLocationKey',
  'apiKeyValueLocations',
  'apiMethodDetectionKey',
  'apiMethodDetectionLocations',
  'cache',
  'errors',
  'connectionTimeoutForSystemDomainRequest',
  'connectionTimeoutForSystemDomainResponse',
  'cookiesDuringHttpRedirectsEnabled',
  'cors',
  'created',
  'customRequestAuthenticationAdapter',
  'dropApiKeyFromIncomingCall',
  'forceGzipOfBackendCall',
  'gzipPassthroughSupportEnabled',
  'headersToExcludeFromIncomingCall',
  'highSecurity',
  'hostPassthroughIncludedInBackendCallHeader',
  'inboundSslRequired',
  'jsonpCallbackParameter',
  'jsonpCallbackParameterValue',
  'scheduledMaintenanceEvent',
  'forwardedHeaders',
  'returnedHeaders',
  'name',
  'numberOfHttpRedirectsToFollow',
  'outboundRequestTargetPath',
  'outboundRequestTargetQueryParameters',
  'outboundTransportProtocol',
  'processor',
  'publicDomains',
  'requestAuthenticationType',
  'requestPathAlias',
  'requestProtocol',
  'oauthGrantTypes',
  'stringsToTrimFromApiKey',
  'supportedHttpMethods',
  'systemDomainAuthentication',
  'systemDomains',
  'trafficManagerDomain',
  'updated',
  'useSystemDomainCredentials',
  'systemDomainCredentialKey',
  'systemDomainCredentialSecret',
  'rateLimitHeadersEnabled'
]

const method = [
  'id',
  'name',
  'created',
  'updated',
  'sampleJsonResponse',
  'sampleXmlResponse'
]

const responseFilter = [
  'id',
  'name',
  'created',
  'updated',
  'notes',
  'xmlFilterFields',
  'jsonFilterFields'
]

const scheduledMaintenanceEvent = [
  'id',
  'name',
  'startDateTime',
  'endDateTime',
  'endpoints'
]

const endpointCache = [
  'clientSurrogateControlEnabled',
  'contentCacheKeyHeaders'
]

const cors = ['allDomainsEnabled', 'maxAge']

const systemDomainAuthentication = [
  'type',
  'username',
  'certificate',
  'password'
]

const serviceError = ['id', 'created', 'updated', 'name', 'action']

const errorSet = ['id', 'name', 'type', 'jsonp', 'jsonpType', 'errorMessages']

const errorMessage = ['id', 'code', 'status', 'detailHeader', 'responseBody']

const cache = ['cacheTtl']

const securityProfile = ['oauth']

const oAuth = [
  'accessTokenTtlEnabled',
  'accessTokenTtl',
  'accessTokenType',
  'allowMultipleToken',
  'authorizationCodeTtl',
  'forwardedHeaders',
  'masheryTokenApiEnabled',
  'refreshTokenEnabled',
  'enableRefreshTokenTtl',
  'tokenBasedRateLimitsEnabled',
  'forceOauthRedirectUrl',
  'forceSslRedirectUrlEnabled',
  'grantTypes',
  'macAlgorithm',
  'qpsLimitCeiling',
  'rateLimitCeiling',
  'refreshTokenTtl',
  'secureTokensEnabled'
]

const role = ['id', 'created', 'updated', 'name', 'action']

const packageEntity = [
  'id',
  'created',
  'updated',
  'name',
  'description',
  'notifyDeveloperPeriod',
  'notifyDeveloperNearQuota',
  'notifyDeveloperOverQuota',
  'notifyDeveloperOverThrottle',
  'notifyAdminPeriod',
  'notifyAdminNearQuota',
  'notifyAdminOverQuota',
  'notifyAdminOverThrottle',
  'notifyAdminEmails',
  'nearQuotaThreshold',
  'eav',
  'keyAdapter',
  'keyLength',
  'sharedSecretLength',
  'plans'
]

const plan = [
  'id',
  'created',
  'updated',
  'name',
  'description',
  'eav',
  'selfServiceKeyProvisioningEnabled',
  'adminKeyProvisioningEnabled',
  'notes',
  'maxNumKeysAllowed',
  'numKeysBeforeReview',
  'qpsLimitCeiling',
  'qpsLimitExempt',
  'qpsLimitKeyOverrideAllowed',
  'rateLimitCeiling',
  'rateLimitExempt',
  'rateLimitKeyOverrideAllowed',
  'rateLimitPeriod',
  'responseFilterOverrideAllowed',
  'status',
  'emailTemplateSetId',
  'services'
]

const packageKey = [
  'id',
  'apikey',
  'secret',
  'created',
  'updated',
  'rateLimitCeiling',
  'rateLimitExempt',
  'qpsLimitCeiling',
  'qpsLimitExempt',
  'status',
  'limits',
  'package',
  'plan'
]

const entityFields = {
  service,
  endpoint,
  method,
  responseFilter,
  scheduledMaintenanceEvent,
  cors,
  systemDomainAuthentication,
  serviceError,
  errorSet,
  errorMessage,
  cache,
  endpointCache,
  securityProfile,
  oAuth,
  role,
  organization,
  package: packageEntity,
  plan,
  packageKey
}

module.exports = {
  ...entityFields,
  makeFieldsParam
}
