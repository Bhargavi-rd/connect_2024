const authModel = require('../models/authModel.js');
const message = require('../utils/message.json');
let authController = module.exports = {
    userReg: async function (req, res, next) {
        try {
            let params = req.body;
            let results = await authModel.getUser(params);
            console.log(results)
            if (results.status) {
                let dataResponse = {
                    status: message.code.successCode,
                    message: message.success.FETCH,
                    data: results.data
                }
                res.status(200).send(dataResponse);
            } else {
                let dataResponse = {
                    status: message.code.errorCode,
                    message: message.error.FETCH
                }
                res.status(400).send(dataResponse);
            }
        } catch (err) {
            let dataResponse = {
                status: message.code.serverErrorCode,
                message: message.error.INTERNAL_SERVER_ERROR
            }
            res.status(600).send(dataResponse);
        }
    }
}