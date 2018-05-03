// Key is name of method on client instance
module.exports = {
  // Organizations are not documented at all
  fetchAllOrganizations: {
    path: '/organizations',
    method: 'GET',
    entity: 'organization'
  },
  fetchOrganization: {
    path: '/organizations/:id',
    method: 'GET',
    entity: 'organization'
  },

  // https://support.mashery.com/docs/read/mashery_api/30/resources/services
  fetchAllServices: {
    path: '/services',
    method: 'GET',
    entity: 'service'
  },
  fetchService: {
    path: '/services/:id',
    method: 'GET',
    entity: 'service'
  },
  createService: {
    path: '/services',
    method: 'POST',
    entity: 'service'
  },
  updateService: {
    path: '/services/:id',
    method: 'PUT',
    entity: 'service'
  },
  deleteService: {
    path: '/services/:id',
    method: 'DELETE'
  },

  // Service Endpoints: http://support.mashery.com/docs/read/mashery_api/30/resources/services/endpoints
  fetchAllServiceEndpoints: {
    path: '/services/:id/endpoints',
    method: 'GET',
    entity: 'endpoint'
  },
  fetchServiceEndpoint: {
    path: '/services/:serviceId/endpoints/:id',
    method: 'GET',
    entity: 'endpoint'
  },
  createServiceEndpoint: {
    path: '/services/:serviceId/endpoints',
    method: 'POST',
    entity: 'endpoint'
  },
  updateServiceEndpoint: {
    path: '/services/:serviceId/endpoints/:id',
    method: 'PUT',
    entity: 'endpoint'
  },
  deleteServiceEndpoint: {
    path: '/services/:serviceId/endpoints/:id',
    method: 'DELETE'
  },

  // Endpoint Methods: https://support.mashery.com/docs/read/mashery_api/30/resources/services/endpoints/methods
  fetchAllEndpointMethods: {
    path: '/services/:serviceId/endpoints/:endpointId/methods',
    method: 'GET',
    entity: 'method'
  },
  fetchEndpointMethod: {
    path: '/services/:serviceId/endpoints/:endpointId/methods/:id',
    method: 'GET',
    entity: 'method'
  },
  createEndpointMethod: {
    path: '/services/:serviceId/endpoints/:endpointId/methods',
    method: 'POST',
    entity: 'method'
  },
  updateEndpointMethod: {
    path: '/services/:serviceId/endpoints/:endpointId/methods/:id',
    method: 'PUT',
    entity: 'method'
  },
  deleteEndpointMethod: {
    path: '/services/:serviceId/endpoints/:endpointId/methods/:id',
    method: 'DELETE'
  },

  // Response Filters: http://support.mashery.com/docs/read/mashery_api/30/resources/services/endpoints/methods/responsefilters
  fetchAllResponseFilters: {
    path:
      '/services/:serviceId/endpoints/:endpointId/methods/:methodId/responseFilters',
    method: 'GET',
    entity: 'responseFilters'
  },
  fetchResponseFilter: {
    path:
      '/services/:serviceId/endpoints/:endpointId/methods/:methodId/responseFilters/:id',
    method: 'GET',
    entity: 'responseFilters'
  },
  createResponseFilter: {
    path:
      '/services/:serviceId/endpoints/:endpointId/methods/:methodId/responseFilters',
    method: 'POST',
    entity: 'responseFilters'
  },
  updateResponseFilter: {
    path:
      '/services/:serviceId/endpoints/:endpointId/methods/:methodId/responseFilters/:id',
    method: 'PUT',
    entity: 'responseFilters'
  },
  deleteResponseFilter: {
    path:
      '/services/:serviceId/endpoints/:endpointId/methods/:methodId/responseFilters/:id',
    method: 'DELETE'
  },

  // Scheduled Maintenance Events: http://support.mashery.com/docs/read/mashery_api/30/resources/services/endpoints/scheduledmaintenanceevent
  fetchScheduledEvent: {
    path:
      '/services/:serviceId/endpoints/:endpointId/scheduledMaintenanceEvent',
    method: 'GET',
    entity: 'scheduledMaintenanceEvent'
  },
  createScheduledEvent: {
    path:
      '/services/:serviceId/endpoints/:endpointId/scheduledMaintenanceEvent',
    method: 'POST',
    entity: 'scheduledMaintenanceEvent'
  },
  updateScheduledEvent: {
    path:
      '/services/:serviceId/endpoints/:endpointId/scheduledMaintenanceEvent',
    method: 'PUT',
    entity: 'scheduledMaintenanceEvent'
  },
  deleteScheduledEvent: {
    path:
      '/services/:serviceId/endpoints/:endpointId/scheduledMaintenanceEvent',
    method: 'DELETE'
  },

  // Endpoint Cache: http://support.mashery.com/docs/read/mashery_api/30/resources/services/endpoints/cache
  fetchEndpointCache: {
    path: '/services/:serviceId/endpoints/:endpointId/cache',
    method: 'GET',
    entity: 'endpointCache'
  },
  createEndpointCache: {
    path: '/services/:serviceId/endpoints/:endpointId/cache',
    method: 'POST',
    entity: 'endpointCache'
  },
  updateEndpointCache: {
    path: '/services/:serviceId/endpoints/:endpointId/cache',
    method: 'PUT',
    entity: 'endpointCache'
  },
  deleteEndpointCache: {
    path: '/services/:serviceId/endpoints/:endpointId/cache',
    method: 'DELETE'
  },

  // CORS: http://support.mashery.com/docs/read/mashery_api/30/resources/services/endpoints/cors
  fetchCORS: {
    path: '/services/:serviceId/endpoints/:endpointId/cors',
    method: 'GET',
    entity: 'cors'
  },
  createCORS: {
    path: '/services/:serviceId/endpoints/:endpointId/cors',
    method: 'POST',
    entity: 'cors'
  },
  updateCORS: {
    path: '/services/:serviceId/endpoints/:endpointId/cors',
    method: 'PUT',
    entity: 'cors'
  },
  deleteCORS: {
    path: '/services/:serviceId/endpoints/:endpointId/cors',
    method: 'DELETE'
  },

  // System Domain Auth: http://support.mashery.com/docs/read/mashery_api/30/resources/services/endpoints/systemdomainauthentication
  fetchSysAuth: {
    path:
      '/services/:serviceId/endpoints/:endpointId/systemDomainAuthentication',
    method: 'GET',
    entity: 'systemDomainAuthentication'
  },
  createSysAuth: {
    path:
      '/services/:serviceId/endpoints/:endpointId/systemDomainAuthentication',
    method: 'POST',
    entity: 'systemDomainAuthentication'
  },
  updateSysAuth: {
    path:
      '/services/:serviceId/endpoints/:endpointId/systemDomainAuthentication',
    method: 'PUT',
    entity: 'systemDomainAuthentication'
  },
  deleteSysAuth: {
    path:
      '/services/:serviceId/endpoints/:endpointId/systemDomainAuthentication',
    method: 'DELETE'
  },

  // Security Profile: http://support.mashery.com/docs/read/mashery_api/30/resources/services/securityprofile
  fetchSecurityProfile: {
    path: '/services/:serviceId/securityProfile',
    method: 'GET',
    entity: 'securityProfile'
  },
  createSecurityProfile: {
    path: '/services/:serviceId/securityProfile',
    method: 'POST',
    entity: 'securityProfile'
  },
  updateSecurityProfile: {
    path: '/services/:serviceId/securityProfile',
    method: 'PUT',
    entity: 'securityProfile'
  },
  deleteSecurityProfile: {
    path: '/services/:serviceId/securityProfile',
    method: 'DELETE'
  },

  // Security Profile - OAuth: http://support.mashery.com/docs/read/mashery_api/30/resources/services/securityprofile/oauth
  fetchSecurityProfileOAuth: {
    path: '/services/:serviceId/securityProfile/oauth',
    method: 'GET',
    entity: 'oAuth'
  },
  createSecurityProfileOAuth: {
    path: '/services/:serviceId/securityProfile/oauth',
    method: 'POST',
    entity: 'oAuth'
  },
  updateSecurityProfileOAuth: {
    path: '/services/:serviceId/securityProfile/oauth',
    method: 'PUT',
    entity: 'oAuth'
  },
  deleteSecurityProfileOAuth: {
    path: '/services/:serviceId/securityProfile/oauth',
    method: 'DELETE'
  },

  // Service Cache: http://support.mashery.com/docs/read/mashery_api/30/resources/services/cache
  fetchServiceCache: {
    path: '/services/:serviceId/cache',
    method: 'GET',
    entity: 'cache'
  },
  createServiceCache: {
    path: '/services/:serviceId/cache',
    method: 'POST',
    entity: 'cache'
  },
  updateServiceCache: {
    path: '/services/:serviceId/cache',
    method: 'PUT',
    entity: 'cache'
  },
  deleteServiceCache: {
    path: '/services/:serviceId/cache',
    method: 'DELETE'
  },

  // Service Roles: http://support.mashery.com/docs/read/mashery_api/30/resources/services/roles
  fetchAllServiceRoles: {
    path: '/services/:id/roles',
    method: 'GET',
    entity: 'roles'
  },
  fetchServiceRole: {
    path: '/services/:serviceId/roles/:id',
    method: 'GET',
    entity: 'roles'
  },
  createServiceRole: {
    path: '/services/:serviceId/roles',
    method: 'POST',
    entity: 'roles'
  },
  updateServiceRole: {
    path: '/services/:serviceId/roles/:id',
    method: 'PUT',
    entity: 'roles'
  },
  deleteServiceRole: {
    path: '/services/:serviceId/roles/:id',
    method: 'DELETE'
  },

  // Error Sets: http://support.mashery.com/docs/read/mashery_api/30/resources/services/errorsets
  fetchAllServiceErrorSets: {
    path: '/services/:id/errorSets',
    method: 'GET',
    entity: 'errorSet'
  },
  fetchServiceErrorSet: {
    path: '/services/:serviceId/errorSets/:id',
    method: 'GET',
    entity: 'errorSet'
  },
  createServiceErrorSet: {
    path: '/services/:serviceId/errorSets',
    method: 'POST',
    entity: 'errorSet'
  },
  updateServiceErrorSet: {
    path: '/services/:serviceId/errorSets/:id',
    method: 'PUT',
    entity: 'errorSet'
  },
  deleteServiceErrorSet: {
    path: '/services/:serviceId/errorSets/:id',
    method: 'DELETE'
  },

  // Error Messages: http://support.mashery.com/docs/read/mashery_api/30/resources/services/errorsets/errormessages
  fetchAllErrorMessages: {
    path: '/services/:serviceId/errorSets/:errorSetId/errorMessages',
    method: 'GET',
    entity: 'errorMessage'
  },
  fetchErrorMessage: {
    path: '/services/:serviceId/errorSets/:errorSetId/errorMessages/:id',
    method: 'GET',
    entity: 'errorMessage'
  },
  createErrorMessage: {
    path: '/services/:serviceId/errorSets/:errorSetId/errorMessages',
    method: 'POST',
    entity: 'errorMessage'
  },
  updateErrorMessage: {
    path: '/services/:serviceId/errorSets/:errorSetId/errorMessages/:id',
    method: 'PUT',
    entity: 'errorMessage'
  },
  deleteErrorMessage: {
    path: '/services/:serviceId/errorSets/:errorSetId/errorMessages/:id',
    method: 'DELETE'
  },

  // Packages: http://support.mashery.com/docs/read/mashery_api/30/resources/packages
  fetchAllPackages: {
    path: '/packages',
    method: 'GET',
    entity: 'package'
  },
  fetchPackage: {
    path: '/packages/:id',
    method: 'GET',
    entity: 'package'
  },
  createPackage: {
    path: '/packages',
    method: 'POST',
    entity: 'package'
  },
  updatePackage: {
    path: '/packages/:id',
    method: 'PUT',
    entity: 'package'
  },
  deletePackage: {
    path: '/packages/:id',
    method: 'DELETE'
  },

  // Package Keys: http://support.mashery.com/docs/read/mashery_api/30/resources/packagekeys
  fetchAllPackageKeys: {
    path: '/packageKeys',
    method: 'GET',
    entity: 'packageKey'
  },
  fetchPackageKey: {
    path: '/packageKeys/:id',
    method: 'GET',
    entity: 'packageKey'
  },
  updatePackageKey: {
    path: '/packageKeys/:id',
    method: 'PUT',
    entity: 'packageKey'
  },
  deletePackageKey: {
    path: '/packageKeys/:id',
    method: 'DELETE'
  },

  // Plans: http://support.mashery.com/docs/read/mashery_api/30/resources/packages/plans
  fetchAllPlans: {
    path: '/packages/:packageId/plans',
    method: 'GET',
    entity: 'plan'
  },
  fetchPlan: {
    path: '/packages/:packageId/plans/:id',
    method: 'GET',
    entity: 'plan'
  },
  createPlan: {
    path: '/packages/:packageId/plans',
    method: 'POST',
    entity: 'plan'
  },

  // Plan Services: http://support.mashery.com/docs/read/mashery_api/30/resources/packages/plans/services
  fetchAllPlanServices: {
    path: '/packages/:packageId/plans/:planId/services',
    method: 'GET',
    entity: 'service'
  },
  fetchAllPlanServicesForService: {
    path: '/packages/:packageId/plans/:planId/services/:id',
    method: 'GET',
    entity: 'service'
  },
  deletePlanService: {
    path: '/packages/:packageId/plans/:planId/services/:id',
    method: 'DELETE',
    entity: 'service'
  },
  updatePlanService: {
    path: '/packages/:packageId/plans/:planId/services/:id',
    method: 'PUT',
    entity: 'service'
  },
  createPlanService: {
    path: '/packages/:packageId/plans/:planId/services',
    method: 'POST',
    entity: 'service'
  },
  createPlanEndpoint: {
    path: '/packages/:packageId/plans/:planId/services/:serviceId/endpoints',
    method: 'POST',
    entity: 'endpoint'
  },
  createPlanMethod: {
    path:
      '/packages/:packageId/plans/:planId/services/:serviceId/endpoints/:endpointId/methods',
    method: 'POST',
    entity: 'endpoint'
  },

  // Domains: http://support.mashery.com/docs/read/mashery_api/30/resources/domains
  fetchAllDomains: {
    path: '/domains',
    method: 'GET',
    entity: 'domain'
  },
  fetchDomain: {
    path: '/domains/:id',
    method: 'GET',
    entity: 'domain'
  },
  createDomain: {
    path: '/domains',
    method: 'POST',
    entity: 'domain'
  },

  // Public Domains: http://support.mashery.com/docs/read/mashery_api/30/resources/domains/public
  fetchPublicDomains: {
    path: '/domains/public',
    method: 'GET',
    entity: 'domain'
  },

  // Public FQDN: http://support.mashery.com/docs/read/mashery_api/30/resources/domains/public/hostnames
  fetchPublicDomainFQDNs: {
    path: '/domains/public/hostnames',
    method: 'GET',
    entity: 'domain'
  },

  // System Domains: http://support.mashery.com/docs/read/mashery_api/30/resources/domains/system
  fetchSystemDomains: {
    path: '/domains/system',
    method: 'GET',
    entity: 'domain'
  },

  // Roles: http://support.mashery.com/docs/read/mashery_api/30/resources/roles
  fetchAllRoles: {
    path: '/roles',
    method: 'GET',
    entity: 'role'
  },

  // Scheduled Maintenance Events: http://support.mashery.com/docs/read/mashery_api/30/resources/scheduledmaintenanceevents
  fetchAllScheduledMaintenance: {
    path: '/scheduledMaintenanceEvents',
    method: 'GET'
  },
  fetchScheduledMaintenance: {
    path: '/scheduledMaintenanceEvents/:id',
    method: 'GET'
  },
  createScheduledMaintenance: {
    path: '/scheduledMaintenanceEvents',
    method: 'POST'
  },
  updateScheduledMaintenance: {
    path: '/scheduledMaintenanceEvents/:id',
    method: 'PUT'
  },
  deleteScheduledMaintenance: {
    path: '/scheduledMaintenanceEvents/:id',
    method: 'DELETE'
  },

  // Scheduled Maintenance Event Endpoints: http://support.mashery.com/docs/read/mashery_api/30/resources/scheduledmaintenanceevents/endpoints
  fetchAllScheduledMaintenanceEndpoints: {
    path: '/scheduledMaintenanceEvents/:maintenanceId/endpoints',
    method: 'GET'
  },
  fetchScheduledMaintenanceEndpoint: {
    path: '/scheduledMaintenanceEvents/:maintenanceId/endpoints/:id',
    method: 'GET'
  },
  createScheduledMaintenanceEndpoint: {
    path: '/scheduledMaintenanceEvents/:maintenanceId/endpoints',
    method: 'POST'
  },
  updateScheduledMaintenanceEndpoint: {
    path: '/scheduledMaintenanceEvents/:maintenanceId/endpoints/:id',
    method: 'PUT'
  },
  deleteScheduledMaintenanceEndpoint: {
    path: '/scheduledMaintenanceEvents/:maintenanceId/endpoints/:id',
    method: 'DELETE'
  },

  // Email Sets: http://support.mashery.com/docs/read/mashery_api/30/resources/emailtemplatesets
  fetchAllEmailTemplateSets: {
    path: '/emailTemplateSets',
    method: 'GET'
  },
  fetchEmailTemplateSet: {
    path: '/emailTemplateSets/:id',
    method: 'GET'
  },
  createEmailTemplateSet: {
    path: '/emailTemplateSets',
    method: 'POST'
  },
  updateEmailTemplateSet: {
    path: '/emailTemplateSets/:id',
    method: 'PUT'
  },
  deleteEmailTemplateSet: {
    path: '/emailTemplateSets/:id',
    method: 'DELETE'
  },

  // Email Templates: http://support.mashery.com/docs/read/mashery_api/30/resources/emailtemplatesets/emailtemplates
  fetchAllEmailTemplates: {
    path: '/emailTemplateSets/:emailSetId/emailTemplates',
    method: 'GET'
  },
  fetchEmailTemplate: {
    path: '/emailTemplateSets/:emailSetId/emailTemplates/:id',
    method: 'GET'
  },
  createEmailTemplate: {
    path: '/emailTemplateSets/:emailSetId/emailTemplates',
    method: 'POST'
  },
  updateEmailTemplate: {
    path: '/emailTemplateSets/:emailSetId/emailTemplates/:id',
    method: 'PUT'
  },
  deleteEmailTemplate: {
    path: '/emailTemplateSets/:emailSetId/emailTemplates/:id',
    method: 'DELETE'
  }
}
