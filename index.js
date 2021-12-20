require('dotenv').config()
const express = require('express')
const userController = require('./src/controller/user')
const transactionController = require('./src/controller/user')
const walletController = require('./src/controller/user')
const helperCommon = require('./src/helper/common')
const adminRoute = require('./src/route/admin')
const userRoute = require('./src/route/user')
const app = express()
const morgan = require('morgan')
 

// middleware
app.use(express.json())

// middleware-logging
app.use(morgan('dev'))


// (admin)
app.use('/admin', adminRoute)

// (user)
app.use('/user', userRoute)

// register
app.post('/register', userController.registerUser)

// transaction



// history

// seach by name


// url not found
app.use(helperCommon.url)

// error handling
app.use((err, req, res, next) => {
  console.log(err)
  res.status(err.status).send(err.message)
})


// listen
app.listen(1234, () =>{
  console.log('server running....')
})