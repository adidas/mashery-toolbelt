class MasheryClientError extends Error {
  constructor(code, message = ERROR_MESSAGES[code]) {
    super(message)
    this.code = code
    this.name = this.constructor.name
  }
}
class AuthenticationError extends MasheryClientError { }
class RequestError extends MasheryClientError { }

module.exports = {
  MasheryClientError,
  AuthenticationError,
  RequestError
}
