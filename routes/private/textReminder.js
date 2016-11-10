const router = require('express').Router();

var accountSid = 'AC4cbc62ee88d6fcb17b86cca24cb31215';
var authToken = '9c71df4b5f85bb05b6781fa0bd81b860';

//require the Twilio module and create a REST client
var client = require('twilio')(accountSid, authToken);

router.post('/', function(req, res){

client.messages.create({
    to: "+16122033602",
    from: "+17633163788",
    body: "You have a pantry item expiring. Check your inventory list. ",
}, function(err, message) {
    console.log(message.sid);
}
);

}
module.exports = router;
