module.exports = {
  mail: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    user: process.env.GOOGLE_MAIL,
    refreshToken:process.env.GOOGLE_REFRESH_TOKEN,
    accessToken:process.env.GOOGLE_ACCESS_TOKEN,
    callback:process.env.CALLBACK

  },
  api: {
    key: process.env.GOOLE_API_KEY
},
twilio:{
     accountSid : process.env.TWILIO_ACCOUNTSID,
     authToken : process.env.TWILIO_AUTHTOKEN,
     number: process.env.TWILIO_NUMBER,
}
};
