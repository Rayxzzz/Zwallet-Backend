const url = (req,res,next) => {
    res.status(404)
    res.send('url not found')
  }

module.exports = {url}