const router = require('express').Router();
const twilio = require('twilio');
var credentials = require('../../auth/credentials');

var clientTwilio = new twilio.RestClient(credentials.twilio.accountSid, credentials.twilio.authToken);
//require the Twilio module and create a REST client


router.post('/', function(req, res){

clientTwilio.messages.create({
    to: "+16122033602",
    from: credentials.twilio.number,
    body: "You have a pantry item expiring. Check your inventory list. ",
},  function(err, responseData) { //this function is executed when a response is received from Twilio

          if (!err) { // "err" is an error received during the request, if any

              console.log(responseData.body); // outputs slogan of the day

          } else {
            console.log('error sending message', err);
          }

      });//end of send message

});


module.exports = router;
