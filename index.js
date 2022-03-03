require('dotenv').config()
const express = require('express')
const helperCommon = require('./src/helper/common')
const adminRoute = require('./src/route/admin')
const userRoute = require('./src/route/user')
const authRoute = require('./src/route/auth')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser');
const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer(app);
const io = new Server(httpServer, { 
  cors: {
    origin: "http://localhost:3000/",
    methods: ["GET", "POST"]
  }
 });


const PORT = process.env.PORT || 1234

// socket
io.on('connection', (socket) => {
  socket.on('userOnline', (data)=>{
    console.log(`user ${data.user_id} online`)
    socket.join(data.user_id)
  })

  socket.on('disconnect', ()=> {
    console.log('user left');
  })

  socket.emit('notification', "hello welcome to zwallet")
  


  socket.on('sendMoney',(data)=>{
    socket.to(data.receiver).emit('sendMoney', data)
  })

})


// middleware
app.use(express.json())
app.use(cors())

// middleware-logging
app.use(morgan('dev'))

// (admin)
app.use('/admin', adminRoute)

// portal
app.use('/auth', authRoute)

// (user)
app.use('/user', userRoute)

app.use('/file', express.static('./uploads'))

// transaction

// history

// seach by name

// url not found
app.use(helperCommon.url)

// error handling
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.log(err)
  helperCommon.respons(res, null, err.status, err.message)
})

// listen
httpServer.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})

module.exports = app