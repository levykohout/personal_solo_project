const router = require('express').Router();
const nodemailer = require('nodemailer');
var bodyParser = require('body-parser');
var urlencodedparser = bodyParser.urlencoded({extended: false});

// pull in credentials module
var credentials = require('../../auth/credentials');
var xoauth2 = require('xoauth2');

// use body-parser
router.use(urlencodedparser);
router.use(bodyParser.json());


// post router
router.post('/', function(req, res){
  console.log('in mail get');
  console.log('email', req.user.email);


  var authConfig = {
    user: req.user.email,
    scope: 'https://mail.google.com',
    clientId: credentials.mail.clientId,
    clientSecret: credentials.mail.clientSecret,
    refreshToken: req.user.refreshtoken,
    accessToken: req.user.accesstoken


  }
  console.log('auth config=', authConfig)
  // create nodemailer transporter for sending email
  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      xoauth2: xoauth2.createXOAuth2Generator(authConfig)
    }
  });


  var mailOptions = {
   from: credentials.mail.user,
   // to: req.body.recipient,
   to:req.user.email,
   subject: 'Product expiring in 3 days',
   text: 'Warning! You have products expiring in 3 days. Click link below for ideas on what you can use them for.',
   html: '<div><p>You have a product expiring in 3 days! Click link below for recipe ideas for this item </p></div><div> <a href="http://localhost:3000/recipes">Click Here </a></div>'
  };

  transporter.sendMail(mailOptions, function(error, info){
    if(error){
      console.log(error);
    } else {
      console.log('Message sent: ' + info.response);
      res.send(info.response);
    }
  }); // end sendMail
}); // end post

module.exports = router;
