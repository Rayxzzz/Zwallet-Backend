const express = require('express')
const userController = require('../controller/user')
const { verifyToken, isAdmin } = require('../helper/auth')
// const adminValidation = require('../helper/common')
const route = express.Router()

route.get('/users-list', verifyToken, isAdmin, userController.userList) // see all user
route.get('/users-list2', userController.userlist2) // see all user
// route.get('/users/search', userController.search) // search user by name
route.delete('/users/delete/:id', verifyToken, isAdmin, userController.deleteU) // delete user

module.exports = route
