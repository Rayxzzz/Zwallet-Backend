const transferModel = require('../models/transaction')
const userModel = require('../models/user')


const transferDetail = async(req,res,next) => {
    const idUser = req.params.id
    const result = await transferModel.seeWalletDetail(idUser)
    const user = await userModel.readAllUser()
    const balance = result[0].balance
    const invoice = Math.floor(Math.random() * 99999)
    const {amount,receiver} = req.body
    const data = {
        invoice: invoice,
        id_sender: idUser,
        receiver: receiver,
        amount: amount,
        status: "pending",
        date: new Date()
    }
    const user_id = user.map(user => user.user_id)
    const checkuser = user_id.includes(receiver)
    if(checkuser == false){
        res.send('id receiver not found')
    }else if(balance < amount){
        res.send('no')
    }else{
        const createInvoice = await transferModel.createTransfer(data, balance)
        console.log(createInvoice)
        res.send(`confirm at this in invoice ${data.invoice}`)
    }
}

const confirm = async (req,res,next) => {
    const invoice = req.params.invoice
    const idUser= req.params.id
    const balanceSender = await userModel.readAllbalance(idUser)
    const bs = balanceSender[0].balance
    const transferDetail = await transferModel.readDetailTransfer(invoice)
    const transferAmount = transferDetail[0].amount
    const idReceiver = transferDetail[0].receiver
    const balancereceiver = await userModel.readAllbalance(idReceiver)
    const br = balancereceiver[0].balance
    const dataS = {
        balance : bs - transferAmount
    }
    const dataR = {
        balance : br + transferAmount
    }
    const updateSender = await transferModel.updateWalletT(dataS, idUser)
    const updateReceiver = await transferModel.updateWalletT(dataR, idReceiver) 
    const success = await transferModel.updatestatus(invoice)
    res.send("transfer success")

}

const history = async(req,res,next) => {
    const idUser = req.params.id
    const result = await transferModel.getHistory(idUser)
    for( var i = 0; i < result.length; ++i ) {
        console.log(result[i] = {
            invoice: result[i].invoice,
            receiver: result[i].receiver,
            amount: result[i].amount,
            date: result[i].date.toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }),
            status: result[i].status
        })
    }
    res.send(result)
}

const cancelTransfer = async(req,res,next) => {
    const invoice = req.params.invoice
    const result = await transferModel.deleteInvoice(invoice)
    res.send('Transfer Canceled')
}

module.exports = {
    transferDetail,
    confirm,
    history,
    cancelTransfer
}