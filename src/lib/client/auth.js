const fetch = require('node-fetch')
const { URL, URLSearchParams } = require('url')
const errorMessages = require('./error_messages')
const { AuthenticationError } = require('./errors')

function validateCredentials (credentials, required) {
  const missing = []

  required.forEach(key => {
    const val = credentials[key]
    if (typeof val !== 'string' || val.trim().length === 0) {
      missing.push(key)
    }
  })

  if (missing.length > 0) {
    throw new AuthenticationError(
      'missing_credentials',
      errorMessages.missing_credentials(missing)
    )
  }

  return true
}

function makeAuthRequest (options, { key, secret }, params) {
  const url = new URL(options.tokenEndpoint, options.host).toString()
  const basicAuth = Buffer.from(`${key}:${secret}`).toString('base64')
  const requestOptions = {
    method: 'POST',
    body: params,
    headers: {
      Accept: 'application/json',
      Authorization: `Basic ${basicAuth}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }

  return fetch(url.toString(), requestOptions)
}

function authenticate (options, credentials) {
  return new Promise((resolve, reject) => {
    validateCredentials(credentials, [
      'username',
      'password',
      'key',
      'secret',
      'scope'
    ])

    const params = new URLSearchParams()
    params.set('grant_type', 'password')
    params.set('username', credentials.username)
    params.set('password', credentials.password)
    params.set('scope', credentials.scope)

    makeAuthRequest(options, credentials, params).then(resolve, reject)
  })
}

function refreshToken (options, credentials) {
  return new Promise((resolve, reject) => {
    validateCredentials(credentials, ['key', 'secret', 'refreshToken'])

    const params = new URLSearchParams()
    params.set('grant_type', 'refresh_token')
    params.set('refresh_token', credentials.refreshToken)

    makeAuthRequest(options, credentials, params).then(resolve, reject)
  })
}

module.exports = {
  authenticate,
  refreshToken
}
