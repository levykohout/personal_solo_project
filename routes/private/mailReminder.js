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

// listen for token updates (if refreshToken is set)
// you probably want to store these to a db
//
// generator.on('token', function(token){
//     console.log('New token for %s: %s', token.user, token.accessToken);
// });

// exports.mailReminder=function(){

// create reusable transporter object using the default SMTP transport
// var transporter = nodemailer.createTransport('smtps://user%40gmail.com:pass@smtp.gmail.com');

// setup e-mail data with unicode symbols
// var mailOptions = {
//     from: '"Fred Foo 👥" <foo@blurdybloop.com>', // sender address
//     to: 'bar@blurdybloop.com, baz@blurdybloop.com', // list of receivers
//     subject: 'Hello ✔', // Subject line
//     text: 'Hello world 🐴', // plaintext body
//     html: '<b>Hello world 🐴</b>' // html body
// };
//
// // send mail with defined transport object
// transporter.sendMail(mailOptions, function(error, info){
//     if(error){
//         return console.log(error);
//     }
//     console.log('Message sent: ' + info.response);
// });
//
// }





// post router
router.post('/', function(req, res){
  console.log('in mail get');
  console.log('email', req.user.email);


  var authConfig = {
    user: credentials.mail.user,
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
  // var recipient = req.body.recipient;
  // var text = req.body.text;

  var mailOptions = {
   from: credentials.mail.user,
   // to: req.body.recipient,
   to:'bennyjon12@gmail.com',
   subject: 'Product Expiring',
   // html: '<img src=' + '"' + req.body.imageURL + '"' + '</>'
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
