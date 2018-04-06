/*
[ method name, url pattern, http method, entity name]
*/
module.exports = [
  // Organizations are not documented
  ['fetchAllOrganizations', '/organizations', 'GET', 'organization'],
  ['fetchOrganization', '/organizations/:id', 'GET', 'organization'],

  // https://support.mashery.com/docs/read/mashery_api/30/resources/services
  ['fetchAllServices', '/services', 'GET', 'service'],
  ['fetchService', '/services/:id', 'GET', 'service'],
  ['createService', '/services', 'POST', 'service'],
  ['updateService', '/services/:id', 'PUT', 'service'],
  ['deleteService', '/services/:id', 'DELETE'],

  // Service Endpoints: http://support.mashery.com/docs/read/mashery_api/30/resources/services/endpoints
  ['fetchAllServiceEndpoints', '/services/:id/endpoints', 'GET', 'endpoint'],
  [
    'fetchServiceEndpoint',
    '/services/:serviceId/endpoints/:id',
    'GET',
    'endpoint'
  ],
  [
    'createServiceEndpoint',
    '/services/:serviceId/endpoints',
    'POST',
    'endpoint'
  ],
  [
    'updateServiceEndpoint',
    '/services/:serviceId/endpoints/:id',
    'PUT',
    'endpoint'
  ],
  ['deleteServiceEndpoint', '/services/:serviceId/endpoints/:id', 'DELETE'],

  // Endpoint Methods: https://support.mashery.com/docs/read/mashery_api/30/resources/services/endpoints/methods
  [
    'fetchAllEndpointMethods',
    '/services/:serviceId/endpoints/:endpointId/methods',
    'GET',
    'method'
  ],
  [
    'fetchEndpointMethod',
    '/services/:serviceId/endpoints/:endpointId/methods/:id',
    'GET',
    'method'
  ],
  [
    'createEndpointMethod',
    '/services/:serviceId/endpoints/:endpointId/methods',
    'POST',
    'method'
  ],
  [
    'updateEndpointMethod',
    '/services/:serviceId/endpoints/:endpointId/methods/:id',
    'PUT',
    'method'
  ],
  [
    'deleteEndpointMethod',
    '/services/:serviceId/endpoints/:endpointId/methods/:id',
    'DELETE'
  ],

  // Response Filters: http://support.mashery.com/docs/read/mashery_api/30/resources/services/endpoints/methods/responsefilters
  [
    'fetchAllResponseFilters',
    '/services/:serviceId/endpoints/:endpointId/methods/:methodId/responseFilters',
    'GET',
    'responseFilters'
  ],
  [
    'fetchResponseFilter',
    '/services/:serviceId/endpoints/:endpointId/methods/:methodId/responseFilters/:id',
    'GET',
    'responseFilters'
  ],
  [
    'createResponseFilter',
    '/services/:serviceId/endpoints/:endpointId/methods/:methodId/responseFilters',
    'POST',
    'responseFilters'
  ],
  [
    'updateResponseFilter',
    '/services/:serviceId/endpoints/:endpointId/methods/:methodId/responseFilters/:id',
    'PUT',
    'responseFilters'
  ],
  [
    'deleteResponseFilter',
    '/services/:serviceId/endpoints/:endpointId/methods/:methodId/responseFilters/:id',
    'DELETE'
  ],

  // Scheduled Maintenance Events: http://support.mashery.com/docs/read/mashery_api/30/resources/services/endpoints/scheduledmaintenanceevent
  [
    'fetchScheduledEvent',
    '/services/:serviceId/endpoints/:endpointId/scheduledMaintenanceEvent',
    'GET',
    'scheduledMaintenanceEvent'
  ],
  [
    'createScheduledEvent',
    '/services/:serviceId/endpoints/:endpointId/scheduledMaintenanceEvent',
    'POST',
    'scheduledMaintenanceEvent'
  ],
  [
    'updateScheduledEvent',
    '/services/:serviceId/endpoints/:endpointId/scheduledMaintenanceEvent',
    'PUT',
    'scheduledMaintenanceEvent'
  ],
  [
    'deleteScheduledEvent',
    '/services/:serviceId/endpoints/:endpointId/scheduledMaintenanceEvent',
    'DELETE'
  ],

  // Endpoint Cache: http://support.mashery.com/docs/read/mashery_api/30/resources/services/endpoints/cache
  [
    'fetchEndpointCache',
    '/services/:serviceId/endpoints/:endpointId/cache',
    'GET',
    'endpointCache'
  ],
  [
    'createEndpointCache',
    '/services/:serviceId/endpoints/:endpointId/cache',
    'POST',
    'endpointCache'
  ],
  [
    'updateEndpointCache',
    '/services/:serviceId/endpoints/:endpointId/cache',
    'PUT',
    'endpointCache'
  ],
  [
    'deleteEndpointCache',
    '/services/:serviceId/endpoints/:endpointId/cache',
    'DELETE'
  ],

  // CORS: http://support.mashery.com/docs/read/mashery_api/30/resources/services/endpoints/cors
  [
    'fetchCORS',
    '/services/:serviceId/endpoints/:endpointId/cors',
    'GET',
    'cors'
  ],
  [
    'createCORS',
    '/services/:serviceId/endpoints/:endpointId/cors',
    'POST',
    'cors'
  ],
  [
    'updateCORS',
    '/services/:serviceId/endpoints/:endpointId/cors',
    'PUT',
    'cors'
  ],
  ['deleteCORS', '/services/:serviceId/endpoints/:endpointId/cors', 'DELETE'],

  // System Domain Auth: http://support.mashery.com/docs/read/mashery_api/30/resources/services/endpoints/systemdomainauthentication
  [
    'fetchSysAuth',
    '/services/:serviceId/endpoints/:endpointId/systemDomainAuthentication',
    'GET',
    'systemDomainAuthentication'
  ],
  [
    'createSysAuth',
    '/services/:serviceId/endpoints/:endpointId/systemDomainAuthentication',
    'POST',
    'systemDomainAuthentication'
  ],
  [
    'updateSysAuth',
    '/services/:serviceId/endpoints/:endpointId/systemDomainAuthentication',
    'PUT',
    'systemDomainAuthentication'
  ],
  [
    'deleteSysAuth',
    '/services/:serviceId/endpoints/:endpointId/systemDomainAuthentication',
    'DELETE'
  ],

  // Security Profile: http://support.mashery.com/docs/read/mashery_api/30/resources/services/securityprofile
  [
    'fetchSecurityProfile',
    '/services/:serviceId/securityProfile',
    'GET',
    'securityProfile'
  ],
  [
    'createSecurityProfile',
    '/services/:serviceId/securityProfile',
    'POST',
    'securityProfile'
  ],
  [
    'updateSecurityProfile',
    '/services/:serviceId/securityProfile',
    'PUT',
    'securityProfile'
  ],
  ['deleteSecurityProfile', '/services/:serviceId/securityProfile', 'DELETE'],

  // Security Profile - OAuth: http://support.mashery.com/docs/read/mashery_api/30/resources/services/securityprofile/oauth
  [
    'fetchSecurityProfileOAuth',
    '/services/:serviceId/securityProfile/oauth',
    'GET',
    'oAuth'
  ],
  [
    'createSecurityProfileOAuth',
    '/services/:serviceId/securityProfile/oauth',
    'POST',
    'oAuth'
  ],
  [
    'updateSecurityProfileOAuth',
    '/services/:serviceId/securityProfile/oauth',
    'PUT',
    'oAuth'
  ],
  [
    'deleteSecurityProfileOAuth',
    '/services/:serviceId/securityProfile/oauth',
    'DELETE',
    'oAuth'
  ],

  // Service Cache: http://support.mashery.com/docs/read/mashery_api/30/resources/services/cache
  ['fetchServiceCache', '/services/:serviceId/cache', 'GET', 'cache'],
  ['createServiceCache', '/services/:serviceId/cache', 'POST', 'cache'],
  ['updateServiceCache', '/services/:serviceId/cache', 'PUT', 'cache'],
  ['deleteServiceCache', '/services/:serviceId/cache', 'DELETE', 'cache'],

  // Service Roles: http://support.mashery.com/docs/read/mashery_api/30/resources/services/roles
  ['fetchAllServiceRoles', '/services/:id/roles', 'GET', 'roles'],
  ['fetchServiceRole', '/services/:serviceId/roles/:id', 'GET', 'roles'],
  ['createServiceRole', '/services/:serviceId/roles', 'POST', 'roles'],
  ['updateServiceRole', '/services/:serviceId/roles/:id', 'PUT', 'roles'],
  ['deleteServiceRole', '/services/:serviceId/roles/:id', 'DELETE'],

  // Error Sets: http://support.mashery.com/docs/read/mashery_api/30/resources/services/errorsets
  ['fetchAllServiceErrorSets', '/services/:id/errorSets', 'GET', 'errorSet'],
  [
    'fetchServiceErrorSet',
    '/services/:serviceId/errorSets/:id',
    'GET',
    'errorSet'
  ],
  [
    'createServiceErrorSet',
    '/services/:serviceId/errorSets',
    'POST',
    'errorSet'
  ],
  [
    'updateServiceErrorSet',
    '/services/:serviceId/errorSets/:id',
    'PUT',
    'errorSet'
  ],
  ['deleteServiceErrorSet', '/services/:serviceId/errorSets/:id', 'DELETE'],

  // Error Messages: http://support.mashery.com/docs/read/mashery_api/30/resources/services/errorsets/errormessages
  [
    'fetchAllErrorMessages',
    '/services/:serviceId/errorSets/:errorSetId/errorMessages',
    'GET',
    'errorMessage'
  ],
  [
    'fetchErrorMessage',
    '/services/:serviceId/errorSets/:errorSetId/errorMessages/:id',
    'GET',
    'errorMessage'
  ],
  [
    'createErrorMessage',
    '/services/:serviceId/errorSets/:errorSetId/errorMessages',
    'POST',
    'errorMessage'
  ],
  [
    'updateErrorMessage',
    '/services/:serviceId/errorSets/:errorSetId/errorMessages/:id',
    'PUT',
    'errorMessage'
  ],
  [
    'deleteErrorMessage',
    '/services/:serviceId/errorSets/:errorSetId/errorMessages/:id',
    'DELETE'
  ],

  // Packages: http://support.mashery.com/docs/read/mashery_api/30/resources/packages
  ['fetchAllPackages', '/packages', 'GET', 'package'],
  ['fetchPackage', '/packages/:id', 'GET', 'package'],
  ['createPackage', '/packages', 'POST', 'package'],
  ['updatePackage', '/packages/:id', 'PUT', 'package'],
  ['deletePackage', '/packages/:id', 'DELETE', 'package'],

  // Package Keys: http://support.mashery.com/docs/read/mashery_api/30/resources/packagekeys
  ['fetchAllPackageKeys', '/packageKeys', 'GET'],
  ['fetchPackageKey', '/packageKeys/:id', 'GET'],
  ['updatePackageKey', '/packageKeys/:id', 'PUT'],
  ['deletePackageKey', '/packageKeys/:id', 'DELETE'],

  // Plans: http://support.mashery.com/docs/read/mashery_api/30/resources/packages/plans
  ['fetchAllPlans', '/packages/:packageId/plans', 'GET', 'plan'],
  ['fetchPlan', '/packages/:packageId/plans/:id', 'GET', 'plan'],
  ['createPlan', '/packages/:packageId/plans', 'POST', 'plan'],

  // Plan Services: http://support.mashery.com/docs/read/mashery_api/30/resources/packages/plans/services
  [
    'fetchAllPlanServices',
    '/packages/:packageId/plans/:planId/services',
    'GET',
    'service'
  ],
  [
    'fetchAllPlanServicesForService',
    '/packages/:packageId/plans/:planId/services/:id',
    'GET',
    'service'
  ],
  [
    'createPlanService',
    '/packages/:packageId/plans/:planId/services',
    'POST',
    'service'
  ],

  [
    'createPlanEndpoint',
    '/packages/:packageId/plans/:planId/services/:serviceId/endpoints',
    'POST',
    'endpoint'
  ],
  [
    'createPlanMethod',
    '/packages/:packageId/plans/:planId/services/:serviceId/endpoints/:endpointId/methods',
    'POST',
    'endpoint'
  ],

  // Domains: http://support.mashery.com/docs/read/mashery_api/30/resources/domains
  ['fetchAllDomains', '/domains', 'GET'],
  ['fetchDomain', '/domains/:id', 'GET'],
  ['createDomain', '/domains', 'POST'],

  // Public Domains: http://support.mashery.com/docs/read/mashery_api/30/resources/domains/public
  ['fetchPublicDomains', '/domains/public', 'GET'],

  // Public FQDN: http://support.mashery.com/docs/read/mashery_api/30/resources/domains/public/hostnames
  ['fetchPublicDomainFQDNs', '/domains/public/hostnames', 'GET'],

  // System Domains: http://support.mashery.com/docs/read/mashery_api/30/resources/domains/system
  ['fetchSystemDomains', '/domains/system', 'GET'],

  // Roles: http://support.mashery.com/docs/read/mashery_api/30/resources/roles
  ['fetchAllRoles', '/roles', 'GET'],

  // Scheduled Maintenance Events: http://support.mashery.com/docs/read/mashery_api/30/resources/scheduledmaintenanceevents
  ['fetchAllScheduledMaintenance', '/scheduledMaintenanceEvents', 'GET'],
  ['fetchScheduledMaintenance', '/scheduledMaintenanceEvents/:id', 'GET'],
  ['createScheduledMaintenance', '/scheduledMaintenanceEvents', 'POST'],
  ['updateScheduledMaintenance', '/scheduledMaintenanceEvents/:id', 'PUT'],
  ['deleteScheduledMaintenance', '/scheduledMaintenanceEvents/:id', 'DELETE'],

  // Scheduled Maintenance Event Endpoints: http://support.mashery.com/docs/read/mashery_api/30/resources/scheduledmaintenanceevents/endpoints
  [
    'fetchAllScheduledMaintenanceEndpoints',
    '/scheduledMaintenanceEvents/:maintenanceId/endpoints',
    'GET'
  ],
  [
    'fetchScheduledMaintenanceEndpoint',
    '/scheduledMaintenanceEvents/:maintenanceId/endpoints/:id',
    'GET'
  ],
  [
    'createScheduledMaintenanceEndpoint',
    '/scheduledMaintenanceEvents/:maintenanceId/endpoints',
    'POST'
  ],
  [
    'updateScheduledMaintenanceEndpoint',
    '/scheduledMaintenanceEvents/:maintenanceId/endpoints/:id',
    'PUT'
  ],
  [
    'deleteScheduledMaintenanceEndpoint',
    '/scheduledMaintenanceEvents/:maintenanceId/endpoints/:id',
    'DELETE'
  ],

  // Email Sets: http://support.mashery.com/docs/read/mashery_api/30/resources/emailtemplatesets
  ['fetchAllEmailTemplateSets', '/emailTemplateSets', 'GET'],
  ['fetchEmailTemplateSet', '/emailTemplateSets/:id', 'GET'],
  ['createEmailTemplateSet', '/emailTemplateSets', 'POST'],
  ['updateEmailTemplateSet', '/emailTemplateSets/:id', 'PUT'],
  ['deleteEmailTemplateSet', '/emailTemplateSets/:id', 'DELETE'],

  // Email Templates: http://support.mashery.com/docs/read/mashery_api/30/resources/emailtemplatesets/emailtemplates
  [
    'fetchAllEmailTemplates',
    '/emailTemplateSets/:emailSetId/emailTemplates',
    'GET'
  ],
  [
    'fetchEmailTemplate',
    '/emailTemplateSets/:emailSetId/emailTemplates/:id',
    'GET'
  ],
  [
    'createEmailTemplate',
    '/emailTemplateSets/:emailSetId/emailTemplates',
    'POST'
  ],
  [
    'updateEmailTemplate',
    '/emailTemplateSets/:emailSetId/emailTemplates/:id',
    'PUT'
  ],
  [
    'deleteEmailTemplate',
    '/emailTemplateSets/:emailSetId/emailTemplates/:id',
    'DELETE'
  ]
]
