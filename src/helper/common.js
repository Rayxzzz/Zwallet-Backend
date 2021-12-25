const createError = require("http-errors");
const userModel = require('../models/user')

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
      console.log(result)
      if (result == 0) {
        next(createError(401, 'user not found'))
      } else {
        next()
      }
    } catch (error) {
      next(createError.InternalServerError)
    }
  }


module.exports = { 
  url,
  respons,
  validation,
  checkUser
}


