const HttpResponse = require('../helpers/http-response')
const MissingParamError = require('../helpers/missing-param-error')
const InvalidParamError = require('../helpers/invalid-param-error')

class LoginRouter {
  constructor (authUseCase, emailValidator) {
    this.authUseCase = authUseCase
    this.emailValidator = emailValidator
  }

  async route (httpRequest) {
    try {
      const { email, password } = httpRequest.body

      if (!email) {
        const error = new MissingParamError('email')
        return HttpResponse.badRequest(error)
      }

      if (!this.emailValidator.isValid(email)) {
        const error = new InvalidParamError('email')
        return HttpResponse.badRequest(error)
      }

      if (!password) {
        const error = new MissingParamError('password')
        return HttpResponse.badRequest(error)
      }

      const accessToken = await this.authUseCase.auth(email, password)

      if (!accessToken) {
        return HttpResponse.unauthorizedError()
      }

      return HttpResponse.ok({ accessToken })
    } catch (error) {
      // TODO: Insert log to report the error that occurred
      console.error(error)
      return HttpResponse.serverError()
    }
  }
}

module.exports = LoginRouter
