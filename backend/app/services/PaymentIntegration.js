const Razorpay = require('razorpay');
const message = require('../utils/message.json');
const crypto = require('crypto');
require('dotenv').config()

let PaymentIntegration = module.exports = {
    createOrder: async function (req, res, next) {
        try {
            let params = req.body;  
            const razorpay = new Razorpay({
                key_id: process.env.RAZORPAY_KEY,
                key_secret: process.env.RAZORPAY_KEY_SECRET
            });
            const options = {
                amount: params.amount,
                currency: process.env.CURRENCY,
                receipt: "receipt#1",
                payment_capture: 1
            };
            const order = await razorpay.orders.create(options);
            res.send(order);
        } catch (err) {
            console.log(err);
            res.status(err.statusCode).send(err.error);
        }
    },
    verifyPayment: async function(req, res, next) {
        try {
          const params = req.body;
      
          const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET); // Use your Razorpay secret key for HMAC
          hmac.update(params.order_id + "|" + params.razorpay_payment_id);
          const generatedSignature = hmac.digest('hex');
      
          if (generatedSignature === params.razorpay_signature) {
            // Payment is verified
            res.status(200).send("Payment success");
          } else {
            // Payment verification failed
            res.status(400).send("Payment verification failed");
          }
        } catch (error) {
          console.error("Error in verifyPayment:", error);
          res.status(500).send("Internal Server Error");
        }
      }      
};
