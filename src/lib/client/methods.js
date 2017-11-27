module.exports = [
  ['fetchAllServices', '/services', 'GET'],
  ['fetchService', '/services/:id', 'GET'],
  ['createService', '/services', 'POST'],
  ['updateService', '/services/:id', 'PUT'],
  ['deleteService', '/services/:id', 'DELETE'],

  // Service Endpoints: http://support.mashery.com/docs/read/mashery_api/30/resources/services/endpoints
  ['fetchAllServiceEndpoints', '/services/:id/endpoints', 'GET'],
  ['fetchServiceEndpoint', '/services/:serviceId/endpoints/:id', 'GET'],
  ['createServiceEndpoint', '/services/:serviceId/endpoints', 'POST'],
  ['updateServiceEndpoint', '/services/:serviceId/endpoints/:id', 'PUT'],
  ['deleteServiceEndpoint', '/services/:serviceId/endpoints/:id', 'DELETE'],

  // Endpoint Methods: http://support.mashery.com/docs/read/mashery_api/30/resources/packages/plans/services/endpoints/methods
  ['fetchAllEndpointMethods', '/services/:serviceId/endpoints/:endpointId/methods', 'GET'],
  ['fetchEndpointMethod', '/services/:serviceId/endpoints/:endpointId/methods/:id', 'GET'],
  ['createEndpointMethod', '/services/:serviceId/endpoints/:endpointId/methods', 'POST'],
  ['updateEndpointMethod', '/services/:serviceId/endpoints/:endpointId/methods/:id', 'PUT'],
  ['deleteEndpointMethod', '/services/:serviceId/endpoints/:endpointId/methods/:id', 'DELETE'],

  // Response Filters: http://support.mashery.com/docs/read/mashery_api/30/resources/services/endpoints/methods/responsefilters
  ['fetchAllResponseFilters', '/services/:serviceId/endpoints/:endpointId/methods/:methodId/responseFilters', 'GET'],
  ['fetchResponseFilter', '/services/:serviceId/endpoints/:endpointId/methods/:methodId/responseFilters/:id', 'GET'],
  ['createResponseFilter', '/services/:serviceId/endpoints/:endpointId/methods/:methodId/responseFilters', 'POST'],
  ['updateResponseFilter', '/services/:serviceId/endpoints/:endpointId/methods/:methodId/responseFilters/:id', 'PUT'],
  ['deleteResponseFilter', '/services/:serviceId/endpoints/:endpointId/methods/:methodId/responseFilters/:id', 'DELETE'],

  // Scheduled Maintenance Events: http://support.mashery.com/docs/read/mashery_api/30/resources/services/endpoints/scheduledmaintenanceevent
  ['fetchScheduledEvent', '/services/:serviceId/endpoints/:endpointId/scheduledMaintenanceEvent', 'GET'],
  ['createScheduledEvent', '/services/:serviceId/endpoints/:endpointId/scheduledMaintenanceEvent', 'POST'],
  ['updateScheduledEvent', '/services/:serviceId/endpoints/:endpointId/scheduledMaintenanceEvent', 'PUT'],
  ['deleteScheduledEvent', '/services/:serviceId/endpoints/:endpointId/scheduledMaintenanceEvent', 'DELETE'],

  // Endpoint Cache: http://support.mashery.com/docs/read/mashery_api/30/resources/services/endpoints/cache
  ['fetchEndpointCache', '/services/:serviceId/endpoints/:endpointId/cache', 'GET'],
  ['createEndpointCache', '/services/:serviceId/endpoints/:endpointId/cache', 'POST'],
  ['updateEndpointCache', '/services/:serviceId/endpoints/:endpointId/cache', 'PUT'],
  ['deleteEndpointCache', '/services/:serviceId/endpoints/:endpointId/cache', 'DELETE'],

  // CORS: http://support.mashery.com/docs/read/mashery_api/30/resources/services/endpoints/cors
  ['fetchCORS', '/services/:serviceId/endpoints/:endpointId/cors', 'GET'],
  ['createCORS', '/services/:serviceId/endpoints/:endpointId/cors', 'POST'],
  ['updateCORS', '/services/:serviceId/endpoints/:endpointId/cors', 'PUT'],
  ['deleteCORS', '/services/:serviceId/endpoints/:endpointId/cors', 'DELETE'],

  // System Domain Auth: http://support.mashery.com/docs/read/mashery_api/30/resources/services/endpoints/systemdomainauthentication
  ['fetchSysAuth', '/services/:serviceId/endpoints/:endpointId/systemDomainAuthentication', 'GET'],
  ['createSysAuth', '/services/:serviceId/endpoints/:endpointId/systemDomainAuthentication', 'POST'],
  ['updateSysAuth', '/services/:serviceId/endpoints/:endpointId/systemDomainAuthentication', 'PUT'],
  ['deleteSysAuth', '/services/:serviceId/endpoints/:endpointId/systemDomainAuthentication', 'DELETE'],

  // Security Profile: http://support.mashery.com/docs/read/mashery_api/30/resources/services/securityprofile
  ['fetchSecurityProfile', '/services/:serviceId/securityProfile', 'GET'],
  ['createSecurityProfile', '/services/:serviceId/securityProfile', 'POST'],
  ['updateSecurityProfile', '/services/:serviceId/securityProfile', 'PUT'],
  ['deleteSecurityProfile', '/services/:serviceId/securityProfile', 'DELETE'],

  // Security Profile - OAuth: http://support.mashery.com/docs/read/mashery_api/30/resources/services/securityprofile/oauth
  ['fetchSecurityProfileOAuth', '/services/:serviceId/securityProfile/oauth', 'GET'],
  ['createSecurityProfileOAuth', '/services/:serviceId/securityProfile/oauth', 'POST'],
  ['updateSecurityProfileOAuth', '/services/:serviceId/securityProfile/oauth', 'PUT'],
  ['deleteSecurityProfileOAuth', '/services/:serviceId/securityProfile/oauth', 'DELETE'],

  // Service Cache: http://support.mashery.com/docs/read/mashery_api/30/resources/services/cache
  ['fetchServiceCache', '/services/:serviceId/cache', 'GET'],
  ['createServiceCache', '/services/:serviceId/cache', 'POST'],
  ['updateServiceCache', '/services/:serviceId/cache', 'PUT'],
  ['deleteServiceCache', '/services/:serviceId/cache', 'DELETE'],

  // Service Roles: http://support.mashery.com/docs/read/mashery_api/30/resources/services/roles
  ['fetchAllServiceRoles', '/services/:id/roles', 'GET'],
  ['fetchServiceRole', '/services/:serviceId/roles/:id', 'GET'],
  ['createServiceRole', '/services/:serviceId/roles', 'POST'],
  ['updateServiceRole', '/services/:serviceId/roles/:id', 'PUT'],
  ['deleteServiceRole', '/services/:serviceId/roles/:id', 'DELETE'],

  // Error Sets: http://support.mashery.com/docs/read/mashery_api/30/resources/services/errorsets
  ['fetchAllServiceErrorSets', '/services/:id/errorSets', 'GET'],
  ['fetchServiceErrorSet', '/services/:serviceId/errorSets/:id', 'GET'],
  ['createServiceErrorSet', '/services/:serviceId/errorSets', 'POST'],
  ['updateServiceErrorSet', '/services/:serviceId/errorSets/:id', 'PUT'],
  ['deleteServiceErrorSet', '/services/:serviceId/errorSets/:id', 'DELETE'],

  // Error Messages: http://support.mashery.com/docs/read/mashery_api/30/resources/services/errorsets/errormessages
  ['fetchAllErrorMessages', '/services/:serviceId/errorSets/:errorSetId/errorMessages', 'GET'],
  ['fetchErrorMessage', '/services/:serviceId/errorSets/:errorSetId/errorMessages/:id', 'GET'],
  ['createErrorMessage', '/services/:serviceId/errorSets/:errorSetId/errorMessages', 'POST'],
  ['updateErrorMessage', '/services/:serviceId/errorSets/:errorSetId/errorMessages/:id', 'PUT'],
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
