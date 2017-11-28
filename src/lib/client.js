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

  if(missing.length > 1) {
    throw new Error('The following credentials are missing or have invalid value: ' + missing.join(', '));
  }

  return true
}

function makeAuthRequest(options, { key, secret }, params) {
  const url = new URL(options.tokenEndpoint, options.host).toString()
  const basicAuth = new Buffer(`${key}:${secret}`).toString('base64');

  return (
    fetch(url.toString(), {
      method: 'POST',
      body: params,
      headers: {
        'Accept':        'application/json',
        'Authorization': `Basic ${basicAuth}`,
        'Content-Type':  'application/x-www-form-urlencoded',
      }
    })
  )
}

function authenticate(options, credentials) {
  validateCredentials(credentials, [ 'username', 'password', 'key', 'secret', 'scope' ])

  const params = new URLSearchParams()
  params.set('grant_type', 'password')
  params.set('username', credentials.username)
  params.set('password', credentials.password)
  params.set('scope', credentials.scope)

  return makeAuthRequest(options, credentials, params)
}

function refreshToken(options, credentials) {
  validateCredentials(credentials, [ 'key', 'secret', 'refreshToken' ])

  const params = new URLSearchParams()
  params.set('grant_type', 'refresh_token')
  params.set('refresh_token', credentials.refreshToken)

  return makeAuthRequest(options, credentials, params)
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
      throw new Error(`'${argName}' for path '${pattern}' cant be '${val}'(${valType})`)
    }

    pathArgs[argName] = val
  })

  return pattern.stringify(pathArgs)
}

function sleep(time) {
  return new Promise(resolve => setTimeout(resolve, time))
}

function callClientRequestWithAuth(client, url, options) {

  // a) authenticate and repeat
  if(!client.isAuthenticated()) {
    return client.authenticate().then(() => callClientRequestWithAuth(client, url, options))

  // b) refresh token and repeat
  } else if(client.isTokenExpired()) {
    return client.refreshToken().then(() => callClientRequestWithAuth(client, url, options))
  }

  // Add AccessToken
  const headersWithAuth = Object.assign({}, options.headers,
    { 'Authorization': `Bearer ${client.credentials.accessToken}` },
  )

  const optionsWithAuth = Object.assign({}, options, { headers: headersWithAuth })

  return fetch(url, optionsWithAuth)
}

function callClientRequest(client, url, options) {
  const request = callClientRequestWithAuth(client, url, options)

  return request.then(response => {
    const headers = response.headers
    const errorCode = headers.get('x-mashery-error-code')

    // a) Catch throttling limit
    if(errorCode === 'ERR_403_DEVELOPER_OVER_QPS') {
      const retryIn = Number(headers.get('retry-after')) * 1000
      return sleep(retryIn).then(() => callClientRequest(client, url, options))

    // b) Catch other errors
    } else if(errorCode) {
      const errorDetail = headers.get('x-error-detail-header')
      const error = new Error(`Request error. code: ${errorCode}, detail: ${errorDetail}`)
      return Promise.reject(error)
    }

    const contentType = headers.get('content-type')

    if(contentType.includes('application/json')) {
      return response.json()
    } else {
      return response.text()
    }
  })
}

function registerClientMethod(client, name, pathPattern, method) {
  const pattern = new UrlPattern(pathPattern)
  method = method.toUpperCase()

  client[name] = function(...args) {
    const path = makePath({ pattern, args })
    const url  = new URL(`${client.options.resourceEndpoint}${path}`, client.options.host)
    const data = args.length > pattern.names.length ? args[pattern.names.length] : null

    const options = {
      headers: {
        'Accept':        'application/json',
        'Content-Type':  'application/json',
      }
    }

    if(method == 'GET') {
      // Set query params
      if(data !== null) {
        Object.keys(data).forEach(key => url.searchParams.set(key, data[key]))
      }
    } else {
      options.method = method
      options.body   = data && JSON.stringify(data)
    }

    return callClientRequest(client, url.toString(), options)
  }
}

function registerClientMethods(client) {
  apiMethods.forEach(([name, path, method]) => {
    registerClientMethod(client, name, path, method)
  })
}

class MasheryClient {
  constructor({ credentials, onAuthSuccess, onAuthError, ...options } = {}) {
    this.options = Object.assign(defaultOptions, options)
    this.credentials = credentials || {}
    this.onAuthSuccess = onAuthSuccess
    this.onAuthError = onAuthError

    this.authenticationDone = this.authenticationDone.bind(this)
    this.authenticationError = this.authenticationError.bind(this)

    registerClientMethods(this)
  }

  isAuthenticated() {
    const { accessToken, refreshToken, tokenExpiresAt } = this.credentials
    return accessToken && refreshToken && tokenExpiresAt
  }

  requireAuthenticication() {
    if(!this.isAuthenticated()) {
      throw new Error('Not authorized')
    }
  }

  isTokenExpired() {
    this.requireAuthenticication()
    const now = +new Date()
    return now > this.credentials.tokenExpiresAt
  }

  authenticate(credentials) {
    this.credentials = Object.assign(this.credentials, credentials)

    return (
      authenticate(this.options, this.credentials)
        .then(this.authenticationDone)
        .catch(this.authenticationError)
    )
  }

  refreshToken() {
    return (
      refreshToken(this.options, this.credentials)
        .then(this.authenticationDone)
        .catch(this.authenticationError)
    )
  }

  authenticationDone(response) {
    const jsonPromise = response.json()

    return jsonPromise.then(data => {
      // Catch errors like
      // { error: 'invalid_scope', error_description: 'Invalid scope.' }
      if(!data || data.error) {
        return Promise.reject(
          new Error(`Authentication error: ${data.error}; description: ${data.error_description}`)
        )
      }

      const tokenExpiresAt = new Date()
      tokenExpiresAt.setSeconds(tokenExpiresAt.getSeconds() + data.expires_in)

      this.credentials = Object.assign(this.credentials, {
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        tokenExpiresAt: +tokenExpiresAt
      })

      if(typeof(this.onAuthSuccess) === 'function') {
        this.onAuthSuccess(this.credentials)
      }
    })
  }

  authenticationError(error) {
    if(typeof(this.onAuthError) === 'function') {
      this.onAuthError(error)
    }

    return Promise.reject(error)
  }
}

module.exports = MasheryClient
