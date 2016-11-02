
var express = require('express');
var router  = express.Router();
var calendar = require('./calendar');
var items = require('./items');
var mailReminder = require('./mailReminder')

/** ---------- SUBROUTES ---------- **/
router.use('/calendar', calendar);
router.use('/items', items);
router.use('/mailReminder',mailReminder);

/**
 * GET private/index
 */
router.get('/', function (req, res) {
  res.redirect('/'); // they made it!
});

module.exports = router;
