// const e = require('express')
// const connection = require('../config/database')
const userModel = require('../models/user')
const createError = require('http-errors')

const userList = async (req,res,next) => {   
    try {
        const name = req.query.name
        console.log(typeof (req.query))
        const result = await userModel.readAllUser()
        const resultsearch = await userModel.searchUser(name)
        if(Object.keys(req.query).length == 0){
            res.json(result)
        } else {
            res.json(resultsearch)
        }  
    } catch (error) {
        console.log(error)
        const err = new createError.InternalServerError()
        next(err)  
    }
    }

// const search = async (req,res,next) => {
//     const {search} = req.body
//     const result = await userModel.searchUser(search)
//     console.log(result)
//     res.json({
//         result
//     })
// }

const deleteU = async(req,res,next) => {
    const userId = req.params.id
    const result = await userModel.deleteUser(userId)
    res.send('user deleted')
}


const userBalance = async (req,res,next) => {
    const idUser = req.params.id
    const result = await userModel.readBalance(idUser)
    res.json(result)
}


const seeProfile = async (req,res,next) => {
    const userId = req.params.id
    try {
        const result = await userModel.readProfile(userId)
        console.log(result)
        if(result == 0){
            res.send('user not found')
        } else{
            res.send(result)    
        }
    } catch (error) {
        res.send('error')
    }
}

const changeProfile = async(req,res,next) => {
    const idUser = req.params.id
    const {name,password} = req.body
    const data = {
        name : name,
        password : password
    }
    const result = await userModel.updateProfile(data, idUser)
    res.json({
        message: 'profile has been update'
    })
}


const registerUser = async(req, res, next) => {
    const {phone, name , email, password, pin} = req.body
    const idUser = Math.floor(Math.random() * 999)
    const data = {
        user_id : idUser,
        phone : phone,
        name : name,
        email : email,
        password : password,
        pin : pin
    }
    const result = await userModel.createUser(data)
    const wallet = await userModel.createWallet(data.user_id)
    // console.log(data.user_id)
    res.json({
        message: `success create account id: ${data.user_id}`
    })
}




module.exports = {
    userList,
    userBalance,
    // userList2,
    changeProfile,
    seeProfile,
    registerUser,
    deleteU
}