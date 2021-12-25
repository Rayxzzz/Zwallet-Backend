const modelWallet = require('../models/wallet')
const responsStandart = require('../helper/common')

// eslint-disable-next-line no-unused-vars
const topUp = async (req, res, next) => {
  const idUser = req.params.id
  const balance = req.body.balance
  const data = {
    balance: balance
  }

  // eslint-disable-next-line no-unused-vars
  const result = await modelWallet.updateWallet(data, idUser)
  responsStandart.respons(res, null, 200, 'success top-up')
}

module.exports = {
  topUp
}
