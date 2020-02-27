const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const AccountModel = mongoose.model('Account')

module.exports = () => {
  router.post('signup', new SignUpRouter().route)
}

// Route
class SignUpRouter {
  async route (req, res) {
    const { email, password, repeatPassword } = req.body
    new SignUpUseCase().signUp(email, password, repeatPassword)
    res.status(400).json({ error: 'password must be equal to repeatPassword' })
  }
}

// Use case
class SignUpUseCase {
  async signUp (email, password, repeatPassword) {
    if (password === repeatPassword) {
      new AddAccountRepository().add(email, password)
    }
  }
}

// Database
class AddAccountRepository {
  async add (email, password) {
    const user = await AccountModel.create({ email, password })
    return user
  }
}
