/*
  Mashery API client inspired with https://github.com/Cox-Automotive/mashery-node
  Supports same methods as in client mentioned above with same api `updateService(id, data)`
  Is only Promise driven

  Usage:
    const MasheryClient = require('./lib/client')
    const api = new MasheryClient({ credentials: { username, password, key, secret, scope } })
    api.fetchAllServices().then(console.log).catch(console.error)
*/

const { URL, URLSearchParams } = require('url')
const fetch = require('node-fetch');
const UrlPattern = require('url-pattern')
const apiMethods = require('./client/methods')

const defaultOptions = {
  host: 'https://api.mashery.com',
  tokenEndpoint: '/v3/token',
  resourceEndpoint: '/v3/rest'
}

class MasheryClientError extends Error {
  constructor(code, message) {
    super(message)
    this.code = code
    this.name = this.constructor.name
  }
}

class AuthenticationError extends MasheryClientError { }
class RequestError extends MasheryClientError { }

const ERROR_MESSAGE = {
  authentication_failed: 'Authentication failed with unknown reason',
  developer_inactive: 'Application key, application secret or accessToken is wrong',
  invalid_client: 'Invalid username or password',
  invalid_field: (methodName, fields) => `Invalid fields '${fields.join(',')}' for '${methodName}' method call`,
  invalid_scope: 'Scope (Area UUID) does not exists',
  invalid_request: 'Invalid resource owner password credentials',
  invalid_url_part: ({ argName, pattern, val, valType }) => `'${argName}' for path '${pattern}' cant be '${val}'(${valType})`,
  missing_credentials: (missing) => 'The following credentials are missing or have invalid value: ' + missing.join(', '),
  not_authenticated: 'Not authenticated',
  unsupported_grant_type: 'Access or refresh token is wrong',
}

//////////////////////
// Auth
//////////////////////

function validateCredentials(credentials, required) {
  const missing = []

  required.forEach(key => {
    const val = credentials[key]
    if(typeof(val) !== 'string' || val.trim().length === 0) {
      missing.push(key)
    }
  })

  if(missing.length > 0) {
    throw new AuthenticationError('missing_credentials', ERROR_MESSAGE.missing_credentials(missing));
  }

  return true
}

function makeAuthRequest(options, { key, secret }, params) {
  const url = new URL(options.tokenEndpoint, options.host).toString()
  const basicAuth = new Buffer(`${key}:${secret}`).toString('base64');
  const requestOptions = {
    method: 'POST',
    body: params,
    headers: {
      'Accept':        'application/json',
      'Authorization': `Basic ${basicAuth}`,
      'Content-Type':  'application/x-www-form-urlencoded',
    }
  }

  return fetch(url.toString(), requestOptions)
}

function authenticate(options, credentials) {
  return new Promise((resolve, reject) => {
    validateCredentials(credentials, [ 'username', 'password', 'key', 'secret', 'scope' ])

    const params = new URLSearchParams()
    params.set('grant_type', 'password')
    params.set('username', credentials.username)
    params.set('password', credentials.password)
    params.set('scope', credentials.scope)

    makeAuthRequest(options, credentials, params).then(resolve, reject)
  })
}

function refreshToken(options, credentials) {
  return new Promise((resolve, reject) => {
    validateCredentials(credentials, [ 'key', 'secret', 'refreshToken' ])

    const params = new URLSearchParams()
    params.set('grant_type', 'ref resh_token')
    params.set('refresh_token', credentials.refreshToken)

    makeAuthRequest(options, credentials, params).then(resolve, reject)
  })
}

//////////////////////
// Requests
//////////////////////

function makePath({ pattern, args }) {
  const pathArgs = {}

  pattern.names.forEach((argName, i) => {
    const val = args[i]
    const valType = typeof(val)

    if(![ 'number', 'string' ].includes(valType)) {
      const errorMessage = ERROR_MESSAGE.invalid_url_part({ argName, pattern, val, valType })
      throw new RequestError('invalid_url_part', errorMessage)
    }

    pathArgs[argName] = val
  })

  return pattern.stringify(pathArgs)
}

function waitForQps(time) {
  return new Promise(resolve => setTimeout(resolve, time))
}

function makeRequestHeaders(credentials) {
  return {
    'Accept':        'application/json',
    'Authorization': `Bearer ${credentials.accessToken}`,
    'Content-Type':  'application/json',
  }
}

function callClientRequestWithAuth(client, url, options) {

  // a) authenticate and repeat
  if(!client.isAuthenticated()) {
    return client.authenticate().then(() => callClientRequestWithAuth(client, url, options))
  }

  // b) refresh token and repeat
  if(client.isTokenExpired()) {
    return refreshToken(client.options, client.credentials)
             .then(client.handleAuthenticationDone)
             .catch(error => {
               // When refresh token is (probably) expired, try to authenticate again with current credentials
               const shouldAuthenticate = error instanceof AuthenticationError && error.code == 'unsupported_grant_type'
               const promise = shouldAuthenticate ? client.authenticate() : Promise.reject(error)
               return promise.catch(client.handleAuthenticationError)
             })
             .then(() => callClientRequestWithAuth(client, url, options))
  }

  const headers = makeRequestHeaders(client.credentials)
  const optionsWithHeaders = Object.assign({}, options, { headers })

  return fetch(url, optionsWithHeaders)
}

function callClientRequest(client, url, options) {
  const request = callClientRequestWithAuth(client, url, options)

  return request.then(response => {
    const headers = response.headers
    const errorCode = headers.get('x-mashery-error-code')

    // a) Catch throttling limit
    if(errorCode === 'ERR_403_DEVELOPER_OVER_QPS') {
      const retryIn = Number(headers.get('retry-after')) * 1000
      return waitForQps(retryIn).then(() => callClientRequest(client, url, options))
    }

    // b) Catch unauthorized access (wrong key, secret or token)
    if(errorCode === 'ERR_403_DEVELOPER_INACTIVE') {
      // TODO: propagate to onAuthenticationError
      const error = new AuthenticationError('developer_inactive', ERROR_MESSAGE.developer_inactive)
      client.handleAuthenticationError(error)
      throw error
    }

    // c) Catch other errors
    if(errorCode) {
      throw new RequestError(errorCode, headers.get('x-error-detail-header'))
    }

    if(headers.get('content-type').includes('application/json')) {
      return response.json()
    } else {
      return response.text()
    }
  })
}

function makeFieldsParam(methodName, allFields, fields) {
  let resultFields

  if(fields === true || fields === 'all') {
    resultFields = allFields
  } else if(Array.isArray(fields)) {
    const invalidFields = []
    fields.forEach(field => {
      if(!allFields.include(field)) { invalidFields.push(field) }
    })

    if(invalidFields.length > 0) {
      throw new RequestError('invalid_fields', ERROR_MESSAGE.invalid_field(methodName, fields))
    }

    resultFields = fields
  } else if(fields && Array.isArray(fields.except)) {
    resultFields = allFields.filter(field => !fields.except.include(field))
  } else {
    return null
  }

  return resultFields.join(",")
}

function registerClientMethod(client, name, pathPattern, method, fields) {
  const pattern = new UrlPattern(pathPattern)
  method = method.toUpperCase()

  client[name] = function(...args) {
    const path = makePath({ pattern, args })
    const url  = new URL(`${client.options.resourceEndpoint}${path}`, client.options.host)
    const data = args.length > pattern.names.length ? args[pattern.names.length] : null

    const options = {}

    if(method == 'GET') {
      // Set query params
      if(data !== null) {
        Object.keys(data).forEach(key => {
          const value = key === 'fields' ? makeFieldsParam(name, fields, data[key]) : data[key]

          if(value !== null && value !== undefined) {
            url.searchParams.set(key, value)
          }
        })
      }
    } else {
      options.method = method
      // TODO: validate data againts fields
      options.body   = data && JSON.stringify(data)
    }

    return callClientRequest(client, url.toString(), options)
  }
}

function registerClientMethods(client) {
  apiMethods.forEach((methodDefinition) => {
    registerClientMethod(client, ...methodDefinition)
  })
}

class MasheryClient {
  constructor({ credentials, onAuthenticationSuccess, onAuthenticationError, ...options } = {}) {
    this.options = Object.assign(defaultOptions, options)
    this.credentials = credentials || {}
    this.onAuthenticationSuccess = onAuthenticationSuccess
    this.onAuthenticationError = onAuthenticationError

    this.handleAuthenticationDone = this.handleAuthenticationDone.bind(this)
    this.handleAuthenticationError = this.handleAuthenticationError.bind(this)

    registerClientMethods(this)
  }

  isAuthenticated() {
    const { accessToken, refreshToken, tokenExpiresAt } = this.credentials
    return accessToken && refreshToken && tokenExpiresAt
  }

  requireAuthentication() {
    if(!this.isAuthenticated()) {
      throw new AuthenticationError('not_authenticated', ERROR_MESSAGE.not_authenticated)
    }
  }

  isTokenExpired() {
    this.requireAuthentication()
    const now = +new Date()
    return now > this.credentials.tokenExpiresAt
  }

  authenticate(credentials = null) {
    if(credentials !== null) {
      this.credentials = credentials
    }

    return authenticate(this.options, this.credentials)
             .then(this.handleAuthenticationDone)
             .catch(this.handleAuthenticationError)
  }

  handleAuthenticationDone(response) {
    const jsonPromise = response.json()

    return jsonPromise.then(data => {
      // Catch auth response errors
      if(!data || data.error) {
        const error = (data && data.error) || 'authentication_failed'
        throw new AuthenticationError(error, ERROR_MESSAGE[error])
      }

      // TODO: new Date() should be set before calling request and not after
      const tokenExpiresAt = new Date()
      tokenExpiresAt.setSeconds(tokenExpiresAt.getSeconds() + data.expires_in)

      this.credentials = Object.assign(this.credentials, {
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        tokenExpiresAt: +tokenExpiresAt
      })

      if(typeof(this.onAuthenticationSuccess) === 'function') {
        this.onAuthenticationSuccess(this.credentials)
      }

      return this.credentials
    })
  }

  handleAuthenticationError(error) {
    if(typeof(this.onAuthenticationError) === 'function') {
      this.onAuthenticationError(error)
    }

    return Promise.reject(error)
  }
}

module.exports = MasheryClient

Object.assign(module.exports, {
  MasheryClientError,
  AuthenticationError,
  RequestError,
})
