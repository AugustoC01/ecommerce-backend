const dotenv = require('dotenv').config();
const yargs = require('yargs/yargs')(process.argv.slice(2));

let args;
if (process.env.NODE_ENV == 'development') {
  args = yargs.default({ port: 8080, mode: 'fork' }).argv;
} else {
  args = yargs.default({ port: 8080, mode: 'cluster' }).argv;
}

const MONGO_URL = process.env.MONGO_URL;

// HEROKU CAE CON EL ARGS.PORT, COMENTAR PARA DEPLOY EN HEROKU
const PORT = args.port || process.env.PORT || 8080;
const MODE = args.mode;
const NODE_ENV = process.env.NODE_ENV;

const SESSION_TIME = process.env.SESSION_TIME;
const TWILIO_accountSid = process.env.TWILIO_accountSid;
const TWILIO_authToken = process.env.TWILIO_authToken;
const TWILIO_WPP_NUM = process.env.TWILIO_WPP_NUM;
const TWILIO_SMS_NUM = process.env.TWILIO_SMS_NUM;
const TWILIO_MI_NUM = process.env.TWILIO_MI_NUM;
const TWILIO_MAIL = process.env.TWILIO_MAIL;
const TWILIO_MAIL_PASS = process.env.TWILIO_MAIL_PASS;

module.exports = {
  PORT,
  MODE,
  NODE_ENV,
  MONGO_URL,
  SESSION_TIME,
  TWILIO_accountSid,
  TWILIO_authToken,
  TWILIO_WPP_NUM,
  TWILIO_SMS_NUM,
  TWILIO_MI_NUM,
  TWILIO_MAIL,
  TWILIO_MAIL_PASS,
};
