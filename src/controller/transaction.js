/* eslint-disable no-unused-vars */
const transferModel = require('../models/transaction')
const userModel = require('../models/user')
const responsStandart = require('../helper/common')
const createError = require('http-errors')
const jwt = require('jsonwebtoken')


const transferDetail = async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1]
  const decoded = jwt.verify(token, process.env.SECRET_KEY_JWT)
  const result = await transferModel.seeWalletDetail(decoded.userid)
  const user = await userModel.readAllUser2()
  const balance = result[0].balance
  const invoice = Math.floor(Math.random() * 99999)
  const { amount, receiver } = req.body
  const data = {
    invoice: invoice,
    id_sender: decoded.userid,
    receiver: receiver,
    amount: amount,
    status: 'pending',
    date: new Date(),
    photo_sender: decoded.photo
  }
  console.log(data)
  const user_id = user.map(user => user.user_id)
  const checkuser = user_id.includes(receiver)
  if (checkuser == false) {
    responsStandart.respons(res, null, 401, 'user not found')
  } else if (balance < amount) {
    responsStandart.respons(res, null, 401, 'your balance is not enought')
  } else {
    const createInvoice = await transferModel.createTransfer(data, balance)
    console.log(createInvoice)
    responsStandart.respons(res, null, 200, `confirm at this in invoice ${data.invoice}`)
  }
}

const confirm = async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1]
  const decoded = jwt.verify(token, process.env.SECRET_KEY_JWT)
  const invoice = req.params.invoice
  const idUser = decoded.userid
  const pin = req.body.pin
  const userData = await userModel.readAllUser2()
  const user = userData.find(user => user.user_id == idUser)
  const pinUser = user.pin
  const balanceSender = await userModel.readAllbalance(idUser)
  const bs = balanceSender[0].balance
  const transferDetail = await transferModel.readDetailTransfer(invoice)
  const transferAmount = transferDetail[0].amount
  const transferStatus = transferDetail[0].status
  const idReceiver = transferDetail[0].receiver
  const balancereceiver = await userModel.readAllbalance(idReceiver)
  const br = balancereceiver[0].balance
  const dataS = {
    balance: bs - transferAmount
  }
  const dataR = {
    balance: br + transferAmount
  }
  if(transferStatus == 'success'){
    next(createError(401, 'you already transfer to this invoice'))
  }
  else if(pin == pinUser){
    const updateSender = await transferModel.updateWalletT(dataS, idUser)
    const updateReceiver = await transferModel.updateWalletT(dataR, idReceiver)
    const success = await transferModel.updatestatus(invoice)
    return responsStandart.respons(res, null, 200, 'transfer success')
  } else{
    console.log(pin)
    console.log(pinUser)
    next(createError(402, 'wrong pin'))
  }
  
}

const history = async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1]
  const decoded = jwt.verify(token, process.env.SECRET_KEY_JWT)
  const idUser = decoded.userid
  const result = await transferModel.getHistory(idUser)
  for (let i = 0; i < result.length; ++i) {
    result[i] = {
      invoice: result[i].invoice,
      receiver: result[i].receiver,
      amount: result[i].amount,
      date: result[i].date.toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }),
      status: result[i].status,
      type: result[i].type,
      photo: result[i].photo_sender
    }
  }
  console.log(result[0].type)
  console.log(result[0].photo_sender)
  responsStandart.respons(res, result, 200, `you have ${result.length} transaction this far`)
}

const historySuccess = async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1]
  const decoded = jwt.verify(token, process.env.SECRET_KEY_JWT)
  const idUser = decoded.userid
  const result = await transferModel.getHistorySuccess(idUser)
  responsStandart.respons(res, result, 200, `you have ${result.length} transaction this far`)
}

const cancelTransfer = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const decoded = jwt.verify(token, process.env.SECRET_KEY_JWT)
  const invoice = decoded.userid
  const result = await transferModel.deleteInvoice(invoice)
  responsStandart.respons(res, null, 200, `transfer ${invoice} canceled`)
}

const detailTransfer = async (req, res) => {
  const invoice = req.params.invoice
  const result = await transferModel.seeInvoice(invoice)
  console.log(result)
  responsStandart.respons(res, result, 200, `test`)
}

module.exports = {
  transferDetail,
  confirm,
  history,
  historySuccess,
  detailTransfer,
  cancelTransfer
}
