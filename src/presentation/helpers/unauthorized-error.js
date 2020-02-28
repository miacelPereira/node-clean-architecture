class AuthorizedError extends Error {
  constructor (paramName) {
    super('Unauthorized')
    this.name = 'AuthorizedError'
  }
}

module.exports = AuthorizedError
