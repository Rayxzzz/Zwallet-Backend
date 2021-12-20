const express = require('express')
const userController = require('../controller/user')
const walletController = require('../controller/wallet')
const transController = require('../controller/transaction')
const route = express.Router()

route.get('/:id/balance', userController.userBalance) //check balance
route.get('/:id', userController.seeProfile) //see profile
route.put('/:id/profile', userController.changeProfile) //change profile
route.put('/:id/top-up', walletController.topUp)
route.post('/:id/transaction', transController.transferDetail)
route.put('/:id/transaction/:invoice', transController.confirm)
route.delete('/:id/transaction/:invoice/c', transController.cancelTransfer)
route.get('/:id/transaction/history', transController.history)

module.exports = route



