const express = require('express')
const userController = require('../controller/user')
const adminValidation = require('../helper/common')
const route = express.Router()

route.get('/users-list', adminValidation.validation, userController.userList) // see all user
// route.get('/users/search', userController.search) // search user by name
route.delete('/users/delete/:id', adminValidation.validation, userController.deleteU) // delete user

module.exports = route
