var router = require('express').Router();
var pg = require('pg');
var config = {
    database: 'rho'
};


var pool = new pg.Pool(config);

router.post('/', function(req, res) {
    console.log(req.body);
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

        client.query('INSERT INTO inventory (category,sku_number,product_name,quantity,date_bought, expiration_date) VALUES ($1, $2, $3, $4, $5, $6) returning *;', [category, sku, name,quantity,buyDate,expirationDate], function(err, result) {
            done();
            if (err) {
                console.log('Error connecting to the DB', err);
                res.sendStatus(500);
                return;
            }

            console.log('Got rows from the DB:', result.rows);
            res.send(result.rows);

        });
    });
});

//
router.get('/', function(req, res) {

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

            console.log('Got rows from the DB:', result.rows);
            res.send(result.rows);

        });

    });
});
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

    console.log(id);

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

        client.query('SELECT * FROM inventory WHERE id=$1',[id], function(err, result) {
            done();
            if (err) {
                console.log('Error querying the DB', err);
                res.sendStatus(500);

                return;
            }

            console.log('Got rows from the DB:', result.rows);
            res.send(result.rows);

        });

    });
});


module.exports = router;
