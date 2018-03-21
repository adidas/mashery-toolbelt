const errorMessages = require('./error_messages')

class MasheryClientError extends Error {
  constructor (code, message = errorMessages[code]) {
    super(message)
    this.code = code
    this.name = this.constructor.name
  }
}
class AuthenticationError extends MasheryClientError {}
class RequestError extends MasheryClientError {}

module.exports = {
  MasheryClientError,
  AuthenticationError,
  RequestError
}
