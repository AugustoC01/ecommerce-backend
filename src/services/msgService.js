const {
  TWILIO_WPP_NUM: WPP_NUM,
  TWILIO_SMS_NUM: SMS_NUM,
  TWILIO_MI_NUM: MI_NUM,
} = require('../../config');

const { client, createTransport } = require('../middlewares/twilio');
const { errorLogger } = require('../helpers/logger');

const MAIL = '';
const MAIL_PASS = '';

const sendWpp = (msg) => {
  try {
    client.messages
      .create({
        body: msg,
        from: `whatsapp:${WPP_NUM}`,
        to: `whatsapp:${MI_NUM}`,
      })
      .done();
  } catch (err) {
    errorLogger(err);
  }
};

const sendSms = (msg) => {
  try {
    client.messages
      .create({
        body: msg,
        from: SMS_NUM,
        to: MI_NUM,
      })
      .done();
  } catch (err) {
    errorLogger(err);
  }
};

const transporter = createTransport({
  service: 'gmail',
  port: 587,
  auth: {
    user: MAIL,
    pass: MAIL_PASS,
  },
});

const sendEmail = async (subject, body) => {
  try {
    const mailOptions = {
      from: MAIL,
      to: MAIL,
      subject: subject,
      html: body,
    };
    await transporter.sendMail(mailOptions);
  } catch (err) {
    errorLogger(err);
  }
};

module.exports = { sendSms, sendWpp, sendEmail };
