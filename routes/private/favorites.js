var router = require('express').Router();
var pool = require('../../db/connection');

router.post('/', function(req, res) {
    console.log(req.body);

    var recipeName = req.body.recipeName;
    var imageUrl = req.body.imageUrl;
    var recipeUrl = req.body.recipeUrl;
    var user_id = req.user.id;

    pool.connect(function(err, client, done) {
        if (err) {
            console.log('Error connecting to the DB', err);
            res.sendStatus(500);
            done();
            return;
        }

        client.query('INSERT INTO favorite_recipe (recipe_name, image_url, recipe_url, user_id) VALUES ($1, $2, $3, $4) returning *;', [recipeName, imageUrl, recipeUrl, user_id], function(err, result) {
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

    var user_id = req.user.id;

    pool.connect(function(err, client, done) {
        if (err) {
            console.log('Error connecting to the DB', err);
            res.sendStatus(500);
            done();
            return;
        }

        client.query('SELECT * FROM favorite_recipe WHERE user_id=$1',[user_id], function(err, result) {
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
