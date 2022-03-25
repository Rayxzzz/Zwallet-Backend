const modelWallet = require('../models/wallet')
const responsStandart = require('../helper/common')
const createError = require('http-errors')
const userModel = require('../models/user')
const jwt = require('jsonwebtoken')


// eslint-disable-next-line no-unused-vars
const topUp = async (req, res, next) => {
try {
  const token = req.headers.authorization.split(' ')[1]
  console.log(token)
  const decoded = jwt.verify(token, process.env.SECRET_KEY_JWT)
  const balance = req.body.balance
  if(typeof(balance) !== 'number'){
    return next(createError(401, 'wrong input'))
  }
  const test = await userModel.readBalance(decoded.userid)
  console.log(test[0].balance)
  const data = {
    balance: test[0].balance + balance 
  }
  
  // eslint-disable-next-line no-unused-vars
  const result = await modelWallet.updateWallet(data, decoded.userid)
  responsStandart.respons(res, null, 200, 'success top-up')
  
} catch (error) {
    console.log(error)
    const err = new createError.InternalServerError()
    next(err)
}
}

module.exports = {
  topUp
}
