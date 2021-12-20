const modelWallet = require('../models/wallet')

const topUp = async(req,res,next) => {
    const idUser = req.params.id
    const balance = req.body.balance 
    const data = {
        balance : balance
    }

    const result = await modelWallet.updateWallet(data, idUser)
    res.json({
        message : 'top up success'
    })
}


module.exports = {
    topUp
}