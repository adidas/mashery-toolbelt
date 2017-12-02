const fields = require('./fields')

module.exports = [
  ['fetchAllServices', '/services', 'GET', fields.service],
  ['fetchService', '/services/:id', 'GET', fields.service],
  ['createService', '/services', 'POST', fields.service],
  ['updateService', '/services/:id', 'PUT', fields.service],
  ['deleteService', '/services/:id', 'DELETE'],

  // Service Endpoints: http://support.mashery.com/docs/read/mashery_api/30/resources/services/endpoints
  ['fetchAllServiceEndpoints', '/services/:id/endpoints', 'GET', fields.endpoint],
  ['fetchServiceEndpoint', '/services/:serviceId/endpoints/:id', 'GET', fields.endpoint],
  ['createServiceEndpoint', '/services/:serviceId/endpoints', 'POST', fields.endpoint],
  ['updateServiceEndpoint', '/services/:serviceId/endpoints/:id', 'PUT', fields.endpoint],
  ['deleteServiceEndpoint', '/services/:serviceId/endpoints/:id', 'DELETE'],

  // Endpoint Methods: http://support.mashery.com/docs/read/mashery_api/30/resources/packages/plans/services/endpoints/methods
  ['fetchAllEndpointMethods', '/services/:serviceId/endpoints/:endpointId/methods', 'GET', fields.method],
  ['fetchEndpointMethod', '/services/:serviceId/endpoints/:endpointId/methods/:id', 'GET', fields.method],
  ['createEndpointMethod', '/services/:serviceId/endpoints/:endpointId/methods', 'POST', fields.method],
  ['updateEndpointMethod', '/services/:serviceId/endpoints/:endpointId/methods/:id', 'PUT', fields.method],
  ['deleteEndpointMethod', '/services/:serviceId/endpoints/:endpointId/methods/:id', 'DELETE'],

  // Response Filters: http://support.mashery.com/docs/read/mashery_api/30/resources/services/endpoints/methods/responsefilters
  ['fetchAllResponseFilters', '/services/:serviceId/endpoints/:endpointId/methods/:methodId/responseFilters', 'GET', fields.responseFilters],
  ['fetchResponseFilter', '/services/:serviceId/endpoints/:endpointId/methods/:methodId/responseFilters/:id', 'GET', fields.responseFilters],
  ['createResponseFilter', '/services/:serviceId/endpoints/:endpointId/methods/:methodId/responseFilters', 'POST', fields.responseFilters],
  ['updateResponseFilter', '/services/:serviceId/endpoints/:endpointId/methods/:methodId/responseFilters/:id', 'PUT', fields.responseFilters],
  ['deleteResponseFilter', '/services/:serviceId/endpoints/:endpointId/methods/:methodId/responseFilters/:id', 'DELETE'],

  // Scheduled Maintenance Events: http://support.mashery.com/docs/read/mashery_api/30/resources/services/endpoints/scheduledmaintenanceevent
  ['fetchScheduledEvent', '/services/:serviceId/endpoints/:endpointId/scheduledMaintenanceEvent', 'GET', fields.scheduledMaintenanceEvent],
  ['createScheduledEvent', '/services/:serviceId/endpoints/:endpointId/scheduledMaintenanceEvent', 'POST', fields.scheduledMaintenanceEvent],
  ['updateScheduledEvent', '/services/:serviceId/endpoints/:endpointId/scheduledMaintenanceEvent', 'PUT', fields.scheduledMaintenanceEvent],
  ['deleteScheduledEvent', '/services/:serviceId/endpoints/:endpointId/scheduledMaintenanceEvent', 'DELETE'],

  // Endpoint Cache: http://support.mashery.com/docs/read/mashery_api/30/resources/services/endpoints/cache
  ['fetchEndpointCache', '/services/:serviceId/endpoints/:endpointId/cache', 'GET', fields.endpointCache],
  ['createEndpointCache', '/services/:serviceId/endpoints/:endpointId/cache', 'POST', fields.endpointCache],
  ['updateEndpointCache', '/services/:serviceId/endpoints/:endpointId/cache', 'PUT', fields.endpointCache],
  ['deleteEndpointCache', '/services/:serviceId/endpoints/:endpointId/cache', 'DELETE'],

  // CORS: http://support.mashery.com/docs/read/mashery_api/30/resources/services/endpoints/cors
  ['fetchCORS', '/services/:serviceId/endpoints/:endpointId/cors', 'GET', fields.cors],
  ['createCORS', '/services/:serviceId/endpoints/:endpointId/cors', 'POST', fields.cors],
  ['updateCORS', '/services/:serviceId/endpoints/:endpointId/cors', 'PUT', fields.cors],
  ['deleteCORS', '/services/:serviceId/endpoints/:endpointId/cors', 'DELETE'],

  // System Domain Auth: http://support.mashery.com/docs/read/mashery_api/30/resources/services/endpoints/systemdomainauthentication
  ['fetchSysAuth', '/services/:serviceId/endpoints/:endpointId/systemDomainAuthentication', 'GET', fields.systemDomainAuthentication],
  ['createSysAuth', '/services/:serviceId/endpoints/:endpointId/systemDomainAuthentication', 'POST', fields.systemDomainAuthentication],
  ['updateSysAuth', '/services/:serviceId/endpoints/:endpointId/systemDomainAuthentication', 'PUT', fields.systemDomainAuthentication],
  ['deleteSysAuth', '/services/:serviceId/endpoints/:endpointId/systemDomainAuthentication', 'DELETE'],

  // Security Profile: http://support.mashery.com/docs/read/mashery_api/30/resources/services/securityprofile
  ['fetchSecurityProfile', '/services/:serviceId/securityProfile', 'GET', fields.securityProfile],
  ['createSecurityProfile', '/services/:serviceId/securityProfile', 'POST', fields.securityProfile],
  ['updateSecurityProfile', '/services/:serviceId/securityProfile', 'PUT', fields.securityProfile],
  ['deleteSecurityProfile', '/services/:serviceId/securityProfile', 'DELETE'],

  // Security Profile - OAuth: http://support.mashery.com/docs/read/mashery_api/30/resources/services/securityprofile/oauth
  ['fetchSecurityProfileOAuth', '/services/:serviceId/securityProfile/oauth', 'GET', fields.oAuth],
  ['createSecurityProfileOAuth', '/services/:serviceId/securityProfile/oauth', 'POST', fields.oAuth],
  ['updateSecurityProfileOAuth', '/services/:serviceId/securityProfile/oauth', 'PUT', fields.oAuth],
  ['deleteSecurityProfileOAuth', '/services/:serviceId/securityProfile/oauth', 'DELETE', fields.oAuth],

  // Service Cache: http://support.mashery.com/docs/read/mashery_api/30/resources/services/cache
  ['fetchServiceCache', '/services/:serviceId/cache', 'GET', fields.cache],
  ['createServiceCache', '/services/:serviceId/cache', 'POST', fields.cache],
  ['updateServiceCache', '/services/:serviceId/cache', 'PUT', fields.cache],
  ['deleteServiceCache', '/services/:serviceId/cache', 'DELETE', fields.cache],

  // Service Roles: http://support.mashery.com/docs/read/mashery_api/30/resources/services/roles
  ['fetchAllServiceRoles', '/services/:id/roles', 'GET', fields.roles],
  ['fetchServiceRole', '/services/:serviceId/roles/:id', 'GET', fields.roles],
  ['createServiceRole', '/services/:serviceId/roles', 'POST', fields.roles],
  ['updateServiceRole', '/services/:serviceId/roles/:id', 'PUT', fields.roles],
  ['deleteServiceRole', '/services/:serviceId/roles/:id', 'DELETE'],

  // Error Sets: http://support.mashery.com/docs/read/mashery_api/30/resources/services/errorsets
  ['fetchAllServiceErrorSets', '/services/:id/errorSets', 'GET', fields.errorSets],
  ['fetchServiceErrorSet', '/services/:serviceId/errorSets/:id', 'GET', fields.errorSets],
  ['createServiceErrorSet', '/services/:serviceId/errorSets', 'POST', fields.errorSets],
  ['updateServiceErrorSet', '/services/:serviceId/errorSets/:id', 'PUT', fields.errorSets],
  ['deleteServiceErrorSet', '/services/:serviceId/errorSets/:id', 'DELETE'],

  // Error Messages: http://support.mashery.com/docs/read/mashery_api/30/resources/services/errorsets/errormessages
  ['fetchAllErrorMessages', '/services/:serviceId/errorSets/:errorSetId/errorMessages', 'GET', fields.errorMessages],
  ['fetchErrorMessage', '/services/:serviceId/errorSets/:errorSetId/errorMessages/:id', 'GET', fields.errorMessages],
  ['createErrorMessage', '/services/:serviceId/errorSets/:errorSetId/errorMessages', 'POST', fields.errorMessages],
  ['updateErrorMessage', '/services/:serviceId/errorSets/:errorSetId/errorMessages/:id', 'PUT', fields.errorMessages],
  ['deleteErrorMessage', '/services/:serviceId/errorSets/:errorSetId/errorMessages/:id', 'DELETE'],

  // Packages: http://support.mashery.com/docs/read/mashery_api/30/resources/packages
  ['fetchAllPackages', '/packages', 'GET'],
  ['fetchPackage', '/packages/:id', 'GET'],
  ['createPackage', '/packages', 'POST'],
  ['updatePackage', '/packages/:id', 'PUT'],
  ['deletePackage', '/packages/:id', 'DELETE'],

  // Package Keys: http://support.mashery.com/docs/read/mashery_api/30/resources/packagekeys
  ['fetchAllPackageKeys', '/packageKeys', 'GET'],
  ['fetchPackageKey', '/packageKeys/:id', 'GET'],
  ['updatePackageKey', '/packageKeys/:id', 'PUT'],
  ['deletePackageKey', '/packageKeys/:id', 'DELETE'],

  // Plans: http://support.mashery.com/docs/read/mashery_api/30/resources/packages/plans
  ['fetchAllPlans', '/packages/:packageId/plans', 'GET'],
  ['fetchPlan', '/packages/:packageId/plans/:id', 'GET'],
  ['createPlan', '/packages/:packageId/plans', 'POST'],

  // Plan Services: http://support.mashery.com/docs/read/mashery_api/30/resources/packages/plans/services
  ['fetchAllPlanServices', '/packages/:packageId/plans/:planId/services', 'GET'],
  ['fetchAllPlanServicesForService', '/packages/:packageId/plans/:planId/services/:id', 'GET'],
  ['createPlanService', '/packages/:packageId/plans/:planId/services', 'POST'],
  ['createPlanEndpoint', '/packages/:packageId/plans/:planId/services/:serviceId/endpoints', 'POST'],
  ['createPlanMethod', '/packages/:packageId/plans/:planId/services/:serviceId/endpoints/:endpointId/methods', 'POST'],

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
  ['fetchAllScheduledMaintenanceEndpoints', '/scheduledMaintenanceEvents/:maintenanceId/endpoints', 'GET'],
  ['fetchScheduledMaintenanceEndpoint', '/scheduledMaintenanceEvents/:maintenanceId/endpoints/:id', 'GET'],
  ['createScheduledMaintenanceEndpoint', '/scheduledMaintenanceEvents/:maintenanceId/endpoints', 'POST'],
  ['updateScheduledMaintenanceEndpoint', '/scheduledMaintenanceEvents/:maintenanceId/endpoints/:id', 'PUT'],
  ['deleteScheduledMaintenanceEndpoint', '/scheduledMaintenanceEvents/:maintenanceId/endpoints/:id', 'DELETE'],

  // Email Sets: http://support.mashery.com/docs/read/mashery_api/30/resources/emailtemplatesets
  ['fetchAllEmailTemplateSets', '/emailTemplateSets', 'GET'],
  ['fetchEmailTemplateSet', '/emailTemplateSets/:id', 'GET'],
  ['createEmailTemplateSet', '/emailTemplateSets', 'POST'],
  ['updateEmailTemplateSet', '/emailTemplateSets/:id', 'PUT'],
  ['deleteEmailTemplateSet', '/emailTemplateSets/:id', 'DELETE'],

  // Email Templates: http://support.mashery.com/docs/read/mashery_api/30/resources/emailtemplatesets/emailtemplates
  ['fetchAllEmailTemplates', '/emailTemplateSets/:emailSetId/emailTemplates', 'GET'],
  ['fetchEmailTemplate', '/emailTemplateSets/:emailSetId/emailTemplates/:id', 'GET'],
  ['createEmailTemplate', '/emailTemplateSets/:emailSetId/emailTemplates', 'POST'],
  ['updateEmailTemplate', '/emailTemplateSets/:emailSetId/emailTemplates/:id', 'PUT'],
  ['deleteEmailTemplate', '/emailTemplateSets/:emailSetId/emailTemplates/:id', 'DELETE'],
]
