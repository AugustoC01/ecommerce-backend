const {
  TWILIO_accountSid: accountSid,
  TWILIO_authToken: authToken,
} = require('../config');
const client = require('twilio')(accountSid, authToken);
const { createTransport } = require('nodemailer');

module.exports = { client, createTransport };
