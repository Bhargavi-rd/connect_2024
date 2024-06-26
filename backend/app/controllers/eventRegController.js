const eventRegModel = require('../models/eventRegModel.js');
const message = require('../utils/message.json');

let authController = module.exports = {
    addEventReg: async function (req, res, next) {
        try {
            let params = req.body;
            let results = await eventRegModel.addEventReg(params);
            if (results.status) {
                let dataResponse = {
                    status: message.code.successCode,
                    message: message.success.INSERT
                };
                res.status(200).send(dataResponse);
            } else {
                let dataResponse = {
                    status: message.code.errorCode,
                    message: message.error.INSERT
                };
                res.status(400).send(dataResponse);
            }
        } catch (err) {
            console.log(err)
            let dataResponse = {
                status: message.code.serverErrorCode,
                message: message.error.INTERNAL_SERVER_ERROR
            };
            res.status(500).send(dataResponse);
        }
    },
    updateEventReg: async function (req, res, next) {
        try {
            let params = req.body;
            let results = await eventRegModel.updateEventReg(params);
            if (results.status) {
                let dataResponse = {
                    status: message.code.successCode,
                    message: message.success.UPDATE
                };
                res.status(200).send(dataResponse);
            } else {
                let dataResponse = {
                    status: message.code.errorCode,
                    message: message.error.UPDATE
                };
                res.status(500).send(dataResponse);
            }
        } catch (err) {
            console.log(err)
            let dataResponse = {
                status: message.code.serverErrorCode,
                message: message.error.INTERNAL_SERVER_ERROR
            };
            res.status(500).send(dataResponse);
        }
    }
};
