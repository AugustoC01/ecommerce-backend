const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } = require('../config');
const client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
const { createTransport } = require('nodemailer');

module.exports = { client, createTransport };
