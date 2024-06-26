const Router = require('express').Router();

const authController = require('../controllers/authController.js');
const eventRegController = require('../controllers/eventRegController.js');
const PaymentIntegration = require('../services/PaymentIntegration.js')

Router.post('/verifyEmail', authController.userReg);
Router.post('/registration', eventRegController.addEventReg);
Router.post('/createOrder', PaymentIntegration.createOrder);
Router.post('/verifyPayment', PaymentIntegration.verifyPayment);
Router.post('/update', eventRegController.updateEventReg);

module.exports = Router