const express = require('express')
const userController = require('../controller/user')
const walletController = require('../controller/wallet')
const validation = require('../helper/common')
const transController = require('../controller/transaction')
const { verifyToken } = require('../helper/auth')
const upload = require('../helper/upload')
const route = express.Router()
const errorUpload = upload.single('photo')
const multer = require('multer')
const createError = require('http-errors')

route.get('/:id/balance', verifyToken, validation.checkUser, userController.userBalance) //check balance
route.get('/:id', verifyToken, validation.checkUser, userController.seeProfile) //see profile
route.put('/:id/profile', verifyToken, function (req, res, next) {
    errorUpload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return next(createError(402, 'maximum file is 1 mb'))
            // A Multer error occurred when uploading.
        } else if (err) {
            return next(createError(400, 'file not allowed'))
            // An unknown error occurred when uploading.
        }
        next()
        // Everything went fine.
    })
}, validation.checkUser, userController.changeName) //change profile
route.put('/:id/profile/pin', verifyToken, validation.checkUser, userController.changePin) //change pin
route.put('/:id/profile/phone', verifyToken, validation.checkUser, userController.changePhone) //change phone
route.put('/:id/top-up', verifyToken, validation.checkUser, walletController.topUp) // top up wallet
route.post('/:id/transaction', verifyToken, validation.checkUser, transController.transferDetail) // make invoice
route.put('/:id/transaction/:invoice', verifyToken, validation.checkUser, transController.confirm) // confirm transfer
route.delete('/:id/transaction/:invoice/c', verifyToken, validation.checkUser, transController.cancelTransfer) // cancel transfer
route.get('/:id/transaction/history', verifyToken, validation.checkUser, transController.history) // see history transaction
route.get('/:id/transaction/:invoice', verifyToken, validation.checkUser, transController.detailTransfer) // see transfer


module.exports = route



