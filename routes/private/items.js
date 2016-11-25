var router = require('express').Router();
var sendMail = require('./mailReminder');
var schedule = require('node-schedule');
var rule = new schedule.RecurrenceRule();
var nodemailer = require('nodemailer');
var moment = require('moment');

// pull in credentials module
var credentials = require('../../auth/credentials');
var xoauth2 = require('xoauth2');

var pg = require('pg');
var config = {
    database: 'rho'
};


var pool = new pg.Pool(config);

router.post('/', function(req, res) {
    console.log('adding items!');
    var category = req.body.category;
    var sku = req.body.sku;
    var name = req.body.name;
    var quantity = req.body.quantity;
    var buyDate = req.body.buyDate;
    var expirationDate = req.body.expirationDate;

    pool.connect(function(err, client, done) {
        if (err) {
            console.log('Error connecting to the DB', err);
            res.sendStatus(500);
            done();
            return;
        }

        client.query('INSERT INTO inventory (category,sku_number,product_name,quantity,date_bought, expiration_date) VALUES ($1, $2, $3, $4, $5, $6) returning *;', [category, sku, name, quantity, buyDate, expirationDate], function(err, result) {
            done();
            if (err) {
                console.log('Error connecting to the DB', err);
                res.sendStatus(500);
                return;
            }
            res.send(result.rows);

        });
    });

}); //end of router.post

//
router.get('/', getItems);

function getItems(req, res) {

    pool.connect(function(err, client, done) {
        if (err) {
            console.log('Error connecting to the DB', err);
            res.sendStatus(500);
            done();
            return;
        }

        client.query('SELECT * FROM inventory', function(err, result) {
            done();
            if (err) {
                console.log('Error querying the DB', err);
                res.sendStatus(500);

                return;
            }
            res.send(result.rows);

        });

    });
};
router.put('/:id', function(req, res) {
    console.log(req.body);

    var id = req.params.id;
    var category = req.body.category;
    var sku = req.body.sku;
    var name = req.body.name;
    var quantity = req.body.quantity;
    var buyDate = req.body.buyDate;
    var expirationDate = req.body.expirationDate;

    pool.connect(function(err, client, done) {
        try { //try block and finally useful way to clean up system resources
            if (err) {
                console.log('Error connecting to the DB', err);
                res.sendStatus(500);

                return; //stops execution of the function
            }
            //Update database
            client.query('UPDATE inventory SET category=$1, sku_number=$2, product_name=$3, quantity=$4, date_bought=$5, expiration_date=$6 WHERE id=$7 RETURNING *;', [category, sku, name, quantity, buyDate, expirationDate, id], function(err, result) {
                if (err) {
                    console.log('Error querying database', err);
                    res.sendStatus(500);

                } else {
                    res.send(result.rows);
                }
            });

        } finally {
            done();
        }
    });
});

router.delete('/:id', function(req, res) {

    var id = req.params.id;

    pool.connect(function(err, client, done) {
        try {

            if (err) {
                console.log('Error in connection to the database', err);
                res.sendStatus(500);
                return;
            }

            client.query('DELETE FROM inventory where id=$1 RETURNING *', [id], function(err) {
                if (err) {
                    console.log('Error querying the DB', err);
                    res.sendStatus(500);
                    return;
                }
                res.sendStatus(204); //status code

            });


        } finally {
            done();
        }

    });

});

router.get('/:id', function(req, res) {

    var id = req.params.id;

    pool.connect(function(err, client, done) {
        if (err) {
            console.log('Error connecting to the DB', err);
            res.sendStatus(500);
            done();
            return;
        }

        client.query('SELECT * FROM inventory WHERE id=$1', [id], function(err, result) {
            done();
            if (err) {
                console.log('Error querying the DB', err);
                res.sendStatus(500);

                return;
            }

            res.send(result.rows);

        });

    });
});

var items;
//schedule email reminders
rule.hour = 8;
rule.minute =30;
schedule.scheduleJob(rule, function() {
    console.log('email scheduled!');
    //get product List
    getAllItems();

}); // end of job scheduleJob

function getAllItems() {
    var expiringItems = [];
    pool.connect(function(err, client, done) {
        if (err) {
            console.log('Error connecting to the DB', err);
            done();
            return;
        }
        //get product List
        client.query('SELECT * FROM inventory', function(err, result) {
            done();
            if (err) {
                console.log('Error querying the DB', err);

                return;
            }
            items = result.rows;
                //check expirationDate
            for (var i = 0; i < items.length; i++) {
                var expirationDate = new Date(items[i].expiration_date);
                var beforeExpiration = moment(expirationDate).clone().subtract(3, 'days').format();
                beforeExpiration = new Date(beforeExpiration);
                var today = new Date;
                var newToday = moment(today).startOf('day');
                    //if expiration date is 3 days from today
                if (beforeExpiration.getTime() == newToday._d.getTime()) {
                    console.log(items[i].product_name, ' is expiring on ', items[i].expiration_date)
                        //send mail
                    sendExpirationMail(items[i].product_name);

                }
            }
        });

    });

}

function sendExpirationMail(product) {
    console.log(product);

    var authConfig = {
        user: 'levy.kohout@gmail.com',
        scope: 'https://mail.google.com',
        clientId: credentials.mail.clientId,
        clientSecret: credentials.mail.clientSecret,
        refreshToken: '1/oXj2MFpRgI15HvMuz76wOKcij57CVxrSt9GzuNrNLjGUH-fx6vl88CpL2P51kY0s',
        accessToken: 'ya29.Ci-gAy4VK3SXV4mpq3RLj6-6NhKFWCIR3PTmFdWAHMNByd7WSWZXG89AAKu78bKMvA'
    }

    // create nodemailer transporter for sending email
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            xoauth2: xoauth2.createXOAuth2Generator(authConfig)
        }
    });


    var mailOptions = {
        from: credentials.mail.user,
        to: 'levy.kohout@gmail.com',
        subject: 'Product expiring in 3 days',
        text: 'Warning! You have ' + product + 'expiring in 3 days. Click link below for ideas on what you can use them for.',
        html: '<div><p>You have' + product + 'expiring in 3 days! Click link below for recipe ideas for this item </p></div><div> <a href="http://localhost:3000/recipes">Click Here </a></div>'
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Message sent: ' + info.response);
            //   res.send(info.response);
        }
    }); // end transporter.sendMail

}




module.exports = router;
