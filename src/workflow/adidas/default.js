const service = {
  // "crossdomainPolicy": "<?xml version=\"1.0\"?>\n<!DOCTYPE cross-domain-policy SYSTEM \"http://www.macromedia.com/xml/dtds/cross-domain-policy.dtd\">\n<cross-domain-policy>\n   <allow-access-from domain=\"*\"/>\n</cross-domain-policy>",
  // "qpsLimitOverall": 0,
  // "robotsPolicy": "",
  // "securityProfile": {
  //   "oauth": null
  // },
  // "rfc3986Encode": false,
}

const endpoint = {
  // "cache": {
  //   "cacheTtlOverride": 0,
  //   "contentCacheKeyHeaders": [],
  //   "clientSurrogateControlEnabled": false,
  //   "includeApiKeyInContentCacheKey": false,
  //   "respondFromStaleCacheEnabled": false,
  //   "responseCacheControlEnabled": false,
  //   "varyHeaderEnabled": false
  // },
  // "scheduledMaintenanceEvent": null,
  // "forwardedHeaders": [],
  // "apiKeyValueLocationKey": "X-MASHERY-API-KEY",
  // "apiKeyValueLocations": [
  //   "request-header"
  // ],
  // "apiMethodDetectionKey": "2",
  // "apiMethodDetectionLocations": [
  //   "request-path"
  // ],
  // "connectionTimeoutForSystemDomainRequest": 5,
  // "connectionTimeoutForSystemDomainResponse": 60,
  // "cors": {
  //   "maxAge": 0,
  //   "cookiesAllowed": false,
  //   "domainsAllowed": [],
  //   "headersAllowed": [],
  //   "headersExposed": [],
  //   "subDomainMatchingAllowed": false,
  //   "allDomainsEnabled": true
  // },
  // "customRequestAuthenticationAdapter": null,
  headersToExcludeFromIncomingCall: null,
  // "jsonpCallbackParameter": "",
  // "jsonpCallbackParameterValue": "",
  // "numberOfHttpRedirectsToFollow": 0,
  // "oauthGrantTypes": [],
  // "outboundRequestTargetPath": "",
  outboundRequestTargetQueryParameters: '',
  // "outboundTransportProtocol": "https",
  // "processor": {
  //   "adapter": "",
  //   "postInputs": {},
  //   "preInputs": {},
  //   "postProcessEnabled": false,
  //   "preProcessEnabled": false
  // },
  // "publicDomains": [
  //   {
  //     "address": "dev.api.3stripes.net"
  //   }
  // ],
  // "requestAuthenticationType": "apiKey",
  // "requestPathAlias": "/stock",
  // "requestProtocol": "rest",
  // "returnedHeaders": [
  //   "mashery-responder"
  // ],
  // "supportedHttpMethods": [
  //   "post",
  //   "get",
  //   "put",
  //   "delete",
  //   "head",
  //   "patch",
  //   "options"
  // ],
  // "systemDomainAuthentication": null,
  // "systemDomainCredentialKey": null,
  // "systemDomainCredentialSecret": null,
  // "systemDomains": [
  //   {
  //     "address": "rocky-reaches-60957.herokuapp.com"
  //   }
  // ],
  // "trafficManagerDomain": "dev.api.3stripes.net",
  allowMissingApiKey: false,
  cookiesDuringHttpRedirectsEnabled: true,
  dropApiKeyFromIncomingCall: true,
  forceGzipOfBackendCall: false,
  gzipPassthroughSupportEnabled: true,
  highSecurity: false,
  hostPassthroughIncludedInBackendCallHeader: false,
  inboundSslRequired: false,
  useSystemDomainCredentials: false
}

const method = {
  sampleJsonResponse: null,
  sampleXmlResponse: null
}

const errorSet = {
  name: 'Default',
  type: 'text/xml',
  errorMessages: [
    {
      id: 'ERR_400_BAD_REQUEST',
      status: 'Bad Request',
      code: 400,
      detailHeader: '',
      responseBody: ''
    },
    {
      id: 'ERR_403_NOT_AUTHORIZED',
      status: 'Forbidden',
      code: 403,
      detailHeader: 'Not Authorized',
      responseBody: ''
    },
    {
      id: 'ERR_403_DEVELOPER_INACTIVE',
      status: 'Forbidden',
      code: 403,
      detailHeader: 'Account Inactive',
      responseBody: ''
    },
    {
      id: 'ERR_403_DEVELOPER_OVER_QPS',
      status: 'Forbidden',
      code: 403,
      detailHeader: 'Account Over Queries Per Second Limit',
      responseBody: ''
    },
    {
      id: 'ERR_403_DEVELOPER_OVER_RATE',
      status: 'Forbidden',
      code: 403,
      detailHeader: 'Account Over Rate Limit',
      responseBody: ''
    },
    {
      id: 'ERR_403_DEVELOPER_UNKNOWN_REFERER',
      status: 'Forbidden',
      code: 403,
      detailHeader: 'Invalid Referer',
      responseBody: ''
    },
    {
      id: 'ERR_403_SERVICE_OVER_QPS',
      status: 'Forbidden',
      code: 403,
      detailHeader: 'Rate Limit Exceeded',
      responseBody: ''
    },
    {
      id: 'ERR_403_SERVICE_REQUIRES_SSL',
      status: 'Forbidden',
      code: 403,
      detailHeader: 'Service Requires SSL',
      responseBody: ''
    },
    {
      id: 'ERR_414_REQUEST_URI_TOO_LONG',
      status: 'Request-URI Too Long',
      code: 414,
      detailHeader: '',
      responseBody: ''
    },
    {
      id: 'ERR_502_BAD_GATEWAY',
      status: 'Bad Gateway',
      code: 502,
      detailHeader: '',
      responseBody: ''
    },
    {
      id: 'ERR_503_SERVICE_UNAVAILABLE',
      status: 'Service Unavailable',
      code: 503,
      detailHeader: 'Scheduled Maintenance',
      responseBody: ''
    },
    {
      id: 'ERR_504_GATEWAY_TIMEOUT',
      status: 'Gateway Timeout',
      code: 504,
      detailHeader: '',
      responseBody: ''
    },
    {
      id: 'ERR_400_UNSUPPORTED_PARAMETER',
      status: 'Bad Request',
      code: 400,
      detailHeader: 'Unsupported Parameter',
      responseBody: ''
    },
    {
      id: 'ERR_400_UNSUPPORTED_SIGNATURE_METHOD',
      status: 'Bad Request',
      code: 400,
      detailHeader: 'Unsupported Signature Method',
      responseBody: ''
    },
    {
      id: 'ERR_400_MISSING_REQUIRED_CONSUMER_KEY',
      status: 'Bad Request',
      code: 400,
      detailHeader: 'Missing Required Consumer Key',
      responseBody: ''
    },
    {
      id: 'ERR_400_MISSING_REQUIRED_REQUEST_TOKEN',
      status: 'Bad Request',
      code: 400,
      detailHeader: 'Missing Required Request Token',
      responseBody: ''
    },
    {
      id: 'ERR_400_MISSING_REQUIRED_ACCESS_TOKEN',
      status: 'Bad Request',
      code: 400,
      detailHeader: 'Missing Required Access Token',
      responseBody: ''
    },
    {
      id: 'ERR_400_DUPLICATED_OAUTH_PROTOCOL_PARAMETER',
      status: 'Bad Request',
      code: 504,
      detailHeader: 'Duplicated OAuth Protocol Parameter',
      responseBody: ''
    },
    {
      id: 'ERR_401_TIMESTAMP_IS_INVALID',
      status: 'Unauthorized',
      code: 401,
      detailHeader: 'Timestamp Is Invalid',
      responseBody: ''
    },
    {
      id: 'ERR_401_INVALID_SIGNATURE',
      status: 'Unauthorized',
      code: 401,
      detailHeader: 'Invalid Signature',
      responseBody: ''
    },
    {
      id: 'ERR_401_INVALID_OR_EXPIRED_TOKEN',
      status: 'Unauthorized',
      code: 401,
      detailHeader: 'Invalid Or Expired Token',
      responseBody: ''
    },
    {
      id: 'ERR_401_INVALID_CONSUMER_KEY',
      status: 'Unauthorized',
      code: 401,
      detailHeader: 'Invalid Consumer Key',
      responseBody: ''
    },
    {
      id: 'ERR_401_INVALID_NONCE',
      status: 'Unauthorized',
      code: 401,
      detailHeader: 'Invalid NONCE',
      responseBody: ''
    }
  ],
  jsonpType: '',
  jsonp: false
}

module.exports = {
  service,
  endpoint,
  method,
  errorSet
}
