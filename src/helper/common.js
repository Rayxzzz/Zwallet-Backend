const createError = require("http-errors");
const userModel = require('../models/user')
const nodemailer = require('nodemailer')
const upload = require('../helper/upload')
const errorUpload = upload.single('photo')
const multer = require('multer')
// eslint-disable-next-line no-unused-vars
const url = (req, res, next) => {
  res.status(404)
  res.json(
    {message: 'url not found'}
    )
}

const respons = (res, result, status, message, pagination) => {
  res.status(status).json({
    status: 'Success',
    code: status || 200,
    data: result,
    message: message || null,
    pagination: pagination
  });
};


const validation = (req, res, next) => {
  const role = req.headers.role
  console.log(role)
  if(role == 'admin'){
    return next()
  }
  return next(createError(402,'this admin privilage'))
}

  const checkUser = async (req, res, next) => {
    const userId = req.params.id
    try {
      const result = await userModel.readProfile(userId)
      // console.log(result)
      if (result == 0) {
        next(createError(401, 'user not found'))
      } else {
        next()
      }
    } catch (error) {
      next(createError.InternalServerError)
    }
  }


const sendEmail = async (toEmail) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_NODE, // generated ethereal user
      pass: process.env.PASS_NODE, // generated ethereal password
    },
  });
  let info = await transporter.sendMail({
    from: `"ADMIN Zwallet" <${process.env.EMAIL_NODE}>`, // sender address
    to: toEmail, // list of receivers
    subject: "verify your Email", // Subject line
    text: "verify your email for full access", // plain text body
    html: "<b>verify</b>", // html body
  });
}

const error =  (req, res, next) => {
  errorUpload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
          return next(createError(402, 'maximum file is 1 mb'))
          // A Multer error occurred when uploading.
      } else if (err) {
          console.log(err)
          return next(createError(400, 'file not allowed'))
          // An unknown error occurred when uploading.
      }
      next()
      // Everything went fine.
  })}


module.exports = { 
  url,
  respons,
  validation,
  checkUser,
  sendEmail,
  error
}


