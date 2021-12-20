const express = require('express')
const userController = require('../controller/user')
const route = express.Router()


route.get('/users-list', userController.userList) // see all user
// route.get('/users/search', userController.search) // search user by name
route.delete('/users/delete/:id', userController.deleteU) // delete user



module.exports = route