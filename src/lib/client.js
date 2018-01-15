/*
  Mashery API client inspired with https://github.com/Cox-Automotive/mashery-node
  Supports same methods as in client mentioned above with same api `updateService(id, data)`
  Is only Promise driven

  Usage:
    const MasheryClient = require('./lib/client')
    const api = new MasheryClient({ credentials: { username, password, key, secret, scope } })
    api.fetchAllServices().then(console.log).catch(console.error)
*/

const { authenticate, refreshToken } = require('./client/auth')
const { registerClientMethods } = require('./client/request')
const { MasheryClientError, AuthenticationError, RequestError } = require('./client/errors')

const defaultOptions = {
  host: 'https://api.mashery.com',
  tokenEndpoint: '/v3/token',
  resourceEndpoint: '/v3/rest'
}

// TODO: add option to enable single pipe requests to prevent cross trigger qps
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
      throw new AuthenticationError('not_authenticated')
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
        throw new AuthenticationError(error)
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
