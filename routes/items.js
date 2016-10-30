var router = require('express').Router();
var pg = require('pg');
var config = {
    database: 'rho'
};


var pool = new pg.Pool(config);

router.post('/', function(req, res) {
    console.log(req.body);
    var gif = req.body.gif;
    var note = req.body.comment;

    pool.connect(function(err, client, done) {
        if (err) {
            console.log('Error connecting to the DB', err);
            res.sendStatus(500);
            done();
            return;
        }

        client.query('INSERT INTO favorites (gif,note) VALUES ($1, $2) returning *;', [gif, note], function(err, result) {
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

        client.query('SELECT * FROM favorites', function(err, result) {
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
    var gif = req.body.gif;
    var note = req.body.comment;

    pool.connect(function(err, client, done) {
        try { //try block and finally useful way to clean up system resources
            if (err) {
                console.log('Error connecting to the DB', err);
                res.sendStatus(500);

                return; //stops execution of the function
            }
            //Update database
            client.query('UPDATE favorites SET gif=$1, note=$2 WHERE id=$3 RETURNING *;', [gif, note, id], function(err, result) {
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

            client.query('DELETE FROM favorites where id=$1 RETURNING *', [id], function(err) {
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


module.exports = router;
