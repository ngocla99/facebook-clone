const nodemailer = require("nodemailer");
require('dotenv').config()
const { google } = require("googleapis");

const { OAuth2 } = google.auth;
const oauth_link = "https://developers.google.com/oauthplayground";
const { EMAIL, MAILING_ID, MAILING_REFRESH, MAILING_SECRET } = process.env;

const auth = new OAuth2(
  MAILING_ID,
  MAILING_SECRET,
  MAILING_REFRESH,
  oauth_link
);

exports.sendVerificationEmail = (email, name, url) => {
  auth.setCredentials({
    refresh_token: MAILING_REFRESH,
  });
  const accessToken = auth.getAccessToken();
  const stmp = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: EMAIL,
      clientId: MAILING_ID,
      clientSecret: MAILING_SECRET,
      refreshToken: MAILING_REFRESH,
      accessToken,
    },
  });
  const mailOptions = {
    from: EMAIL,
    to: email,
    subject: "Facebook email verification",
    html: `<div style="max-width:700px;margin-bottom:1rem;display:flex;align-items:center;gap:10px;font-family:Roboto;font-weight:600;color:#3b5998"><img src="https://res.cloudinary.com/dmhcnhtng/image/upload/v1645134414/logo_cs1si5.png" alt="" style="width:30px"><span>Action requise : Activate your facebook account</span></div><div style="padding:1rem 0;border-top:1px solid #e5e5e5;border-bottom:1px solid #e5e5e5;color:#141823;font-size:17px;font-family:Roboto"><span>Hello ${name}</span><div style="padding:20px 0"><span style="padding:1.5rem 0">You recently created an account on Facebook. To complete your registration, please confirm your account.</span></div><a href=${url} style="width:200px;padding:10px 15px;background:#4c649b;color:#fff;text-decoration:none;font-weight:600">Confirm your account</a><br><div style="padding-top:20px"><span style="margin:1.5rem 0;color:#898f9c">Facebook allows you to stay in touch with all your friends, once refistered on facebook,you can share photos,organize events and much more.</span></div></div>`,
  };
  stmp.sendMail(mailOptions, (err, res) => {
    if (err) return err;
    return res;
  });
};

exports.sendResetCode = (email, name, code) => {
  auth.setCredentials({
    refresh_token: MAILING_REFRESH,
  });
  const accessToken = auth.getAccessToken();
  const stmp = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: EMAIL,
      clientId: MAILING_ID,
      clientSecret: MAILING_SECRET,
      refreshToken: MAILING_REFRESH,
      accessToken,
    },
  });
  const mailOptions = {
    from: EMAIL,
    to: email,
    subject: `${code} is your Facebook account recovery code`,
    html: `<table border="0" cellspacing="0" cellpadding="0" align="center" id="m_-6492370834124990685email_table" style="border-collapse:collapse"><tbody><tr><td id="m_-6492370834124990685email_content" style="font-family:Helvetica Neue,Helvetica,Lucida Grande,tahoma,verdana,arial,sans-serif;background:#ffffff"><table border="0" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse"><tbody><tr><td height="20" style="line-height:20px" colspan="3">&nbsp;</td></tr><tr><td height="1" colspan="3" style="line-height:1px"><span style="color:#ffffff;font-size:1px;opacity:0">We received a request to reset your Facebook password.</span></td></tr><tr><td width="15" style="display:block;width:15px">&nbsp;&nbsp;&nbsp;</td><td><table border="0" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse"><tbody><tr><td height="15" style="line-height:15px" colspan="3">&nbsp;</td></tr><tr><td width="32" align="left" valign="middle" style="height:32;line-height:0px"><img width="32" src="https://ci3.googleusercontent.com/meips/ADKq_NacJ9wHliM1aL0wLV18tpwswFycsJKAjch2-AmGiIWKPZHbxhJsjngSK7Za7fBRfAuMAvgEfp8b9iyIERyhMpdx-oW3yflLbPUwyZr4QYRlOic=s0-d-e1-ft#https://static.xx.fbcdn.net/rsrc.php/v3/yS/r/ZirYDPWh0YD.png" height="32" style="border:0" class="CToWUd" data-bit="iit"></td><td width="15" style="display:block;width:15px">&nbsp;&nbsp;&nbsp;</td><td width="100%"><span style="font-family:Helvetica Neue,Helvetica,Lucida Grande,tahoma,verdana,arial,sans-serif;font-size:19px;line-height:32px;color:#1877f2"></span></td></tr><tr style="border-bottom:solid 1px #e5e5e5"><td height="15" style="line-height:15px" colspan="3">&nbsp;</td></tr></tbody></table></td><td width="15" style="display:block;width:15px">&nbsp;&nbsp;&nbsp;</td></tr><tr><td width="15" style="display:block;width:15px">&nbsp;&nbsp;&nbsp;</td><td><table border="0" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse"><tbody><tr><td height="4" style="line-height:4px">&nbsp;</td></tr><tr><td><span class="m_-6492370834124990685mb_text" style="font-family:Helvetica Neue,Helvetica,Lucida Grande,tahoma,verdana,arial,sans-serif;font-size:16px;line-height:21px;color:#141823"><span style="font-size:15px"><p></p><div style="margin-top:16px;margin-bottom:20px">Hi ${name},</div><div>We received a request to reset your Facebook password.</div>Enter the following password reset code:<p></p><table border="0" cellspacing="0" cellpadding="0" style="border-collapse:collapse;width:max-content;margin-top:20px;margin-bottom:20px"><tbody><tr><td style="font-size:11px;font-family:LucidaGrande,tahoma,verdana,arial,sans-serif;padding:14px 32px 14px 32px;background-color:#f2f2f2;border-left:1px solid #ccc;border-right:1px solid #ccc;border-top:1px solid #ccc;border-bottom:1px solid #ccc;text-align:center;border-radius:7px;display:block;border:1px solid #1877f2;background:#e7f3ff"><span class="m_-6492370834124990685mb_text" style="font-family:Helvetica Neue,Helvetica,Lucida Grande,tahoma,verdana,arial,sans-serif;font-size:16px;line-height:21px;color:#141823"><span style="font-size:17px;font-family:Roboto;font-weight:700;margin-left:0px;margin-right:0px">${code}</span></span></td></tr></tbody></table>Alternatively, you can directly change your password.<table border="0" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse"><tbody><tr><td height="20" style="line-height:20px">&nbsp;</td></tr><tr><td align="middle"><a href="" style="border:0;width:1px;height:1px" class="CToWUd" data-bit="iit"></span></td></tr></tbody></table>`,
  };
  stmp.sendMail(mailOptions, (err, res) => {
    if (err) return err;
    return res;
  });
};
