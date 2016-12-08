var router = require('express').Router();

const url = require('url')

const params = url.parse(process.env.DATABASE_URL);
const auth = params.auth.split(':');

// pull in credentials module


if (process.env.APP_STATE == 'dev'){
    var config = {
        database: 'rho'
    };

} else {

 var config = {
      user: auth[0],
      password: auth[1],
      host: params.hostname,
      port: params.port,
      database: params.pathname.split('/')[1],
      ssl: true
    }

}

var pg = require('pg');
var pool = new pg.Pool(config);




router.post('/', function(req, res) {
    console.log(req.body);

    var recipeName = req.body.recipeName;
    var imageUrl = req.body.imageUrl;
    var recipeUrl = req.body.recipeUrl;

    pool.connect(function(err, client, done) {
        if (err) {
            console.log('Error connecting to the DB', err);
            res.sendStatus(500);
            done();
            return;
        }

        client.query('INSERT INTO favorite_recipe (recipe_name, image_url, recipe_url ) VALUES ($1, $2, $3) returning *;', [recipeName, imageUrl, recipeUrl], function(err, result) {
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

router.get('/', function(req, res) {

    pool.connect(function(err, client, done) {
        if (err) {
            console.log('Error connecting to the DB', err);
            res.sendStatus(500);
            done();
            return;
        }

        client.query('SELECT * FROM favorite_recipe', function(err, result) {
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
