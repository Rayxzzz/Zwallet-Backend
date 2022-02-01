const client = require('../config/redis')


const hitCacheProductId = async(req, res, next) => {
    const id = req.params.id
    const profile = await client.get(`profile/${id}`);
    if(profile !== null){
        res.json({
            status: 'success',
            code: 200,
            data: JSON.parse(profile),
            message: 'data berhasil ambil dari redis'
        })
    }else{
        next()
    }
}

module.exports = {
    hitCacheProductId
}