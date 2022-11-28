const dotenv = require('dotenv').config();
const yargs = require('yargs/yargs')(process.argv.slice(2));
const args = yargs.default({ port: 8080, mode: 'cluster' }).argv;

const PORT = args.port || process.env.PORT;
const MODE = args.mode;
const MONGO_URL = process.env.MONGO_URL;

const TWILIO_accountSid = process.env.TWILIO_accountSid;
const TWILIO_authToken = process.env.TWILIO_authToken;
const TWILIO_WPP_NUM = process.env.TWILIO_WPP_NUM;
const TWILIO_SMS_NUM = process.env.TWILIO_SMS_NUM;
const TWILIO_MI_NUM = process.env.TWILIO_MI_NUM;

module.exports = {
  PORT,
  MODE,
  MONGO_URL,
  TWILIO_accountSid,
  TWILIO_authToken,
  TWILIO_WPP_NUM,
  TWILIO_SMS_NUM,
  TWILIO_MI_NUM,
};
