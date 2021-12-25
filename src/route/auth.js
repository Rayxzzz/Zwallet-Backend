const express = require('express')
const userController = require('../controller/user')
const route = express.Router()


route.post('/register', userController.registerUser)
route.get('/login', userController.login)

module.exports = route