const dotenv = require('dotenv').config();
const yargs = require('yargs/yargs')(process.argv.slice(2));

let args;
if (process.env.NODE_ENV != 'production') {
  args = yargs.default({ port: 8080, mode: 'fork' }).argv;
} else {
  args = yargs.default({ port: 8080, mode: 'cluster' }).argv;
}

let MONGO_URL;
// let FIREBASE_AUTH;
// if (process.env.NODE_ENV == 'development') {
MONGO_URL = process.env.MONGO_URL;
// } else {
//   FIREBASE_AUTH = {
//     type: process.env.FirebaseType,
//     project_id: process.env.FirebaseProject_id,
//     private_key_id: process.env.FirebasePrivate_key_id,
//     private_key: process.env.FirebasePrivate_key,
//     client_email: process.env.FirebaseClient_email,
//     client_id: process.env.FirebaseClient_id,
//     auth_uri: process.env.FirebaseAuth_uri,
//     token_uri: process.env.FirebaseToken_uri,
//     auth_provider_x509_cert_url:
//       process.env.FirebaseAuth_provider_x509_cert_url,
//     client_x509_cert_url: process.env.FirebaseClient_x509_cert_url,
//   };
// }

// HEROKU CAE CON EL ARGS.PORT, COMENTAR PARA DEPLOY EN HEROKU
const PORT = args.port || process.env.PORT || 8080;
const MODE = args.mode;
const NODE_ENV = process.env.NODE_ENV;

const TWILIO_accountSid = process.env.TWILIO_accountSid;
const TWILIO_authToken = process.env.TWILIO_authToken;
const TWILIO_WPP_NUM = process.env.TWILIO_WPP_NUM;
const TWILIO_SMS_NUM = process.env.TWILIO_SMS_NUM;
const TWILIO_MI_NUM = process.env.TWILIO_MI_NUM;

module.exports = {
  PORT,
  MODE,
  NODE_ENV,
  MONGO_URL,
  FIREBASE_AUTH,
  TWILIO_accountSid,
  TWILIO_authToken,
  TWILIO_WPP_NUM,
  TWILIO_SMS_NUM,
  TWILIO_MI_NUM,
};
