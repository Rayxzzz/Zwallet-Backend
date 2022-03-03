const express = require('express')
const userController = require('../controller/user')
const walletController = require('../controller/wallet')
const validation = require('../helper/common')
const transController = require('../controller/transaction')
const { verifyToken } = require('../helper/auth')
const route = express.Router()

route.get('/balance', verifyToken, userController.userBalance) //check balance
route.get('/:id', verifyToken, userController.seeProfile2) //see profile with id
route.get('/', verifyToken, userController.seeProfile) //see profile
route.put('/profile', verifyToken, validation.error, userController.changeName) //change profile
route.put('/profile/pin', verifyToken, userController.changePin) //change pin
route.put('/profile/phone', verifyToken, userController.changePhone) //change phone
route.put('/top-up', verifyToken, walletController.topUp) // top up wallet
route.post('/transaction', verifyToken, transController.transferDetail) // make invoice
route.put('/transaction/:invoice', verifyToken, transController.confirm) // confirm transfer
route.delete('/:id/transaction/:invoice/c', verifyToken, transController.cancelTransfer) // cancel transfer
route.get('/transaction/history', verifyToken, transController.history) // see history transaction
route.get('/transaction/historySuccess', verifyToken, transController.historySuccess) // see history transaction
route.get('/transaction/:invoice', verifyToken, transController.detailTransfer) // see transfer


module.exports = route



