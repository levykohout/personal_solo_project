// const mongoose = require('mongoose');
const router = require('express').Router();
// const bcrypt = require('bcrypt');
// const SALT_ROUNDS = 10;
const pool = require('../db/connection');

// find by username
function findById(googleID, googleEmail, googleName, accessToken, refreshToken) {
  return new Promise(function(resolve, reject){
    pool.connect(function(err, client, done){
      if (err) {
        done();
        return reject(err);
      }

      client.query('SELECT * FROM users WHERE googleid=$1',
      [googleID],
      function(err, result){
        done();
        if (err) {
          reject(err);
        }

        resolve(result.rows[0]);
      });
    });
  });
}

function updateTokens(googleID, googleEmail, googleName, accessToken, refreshToken){
    return new Promise(function(resolve, reject){
    pool.connect(function(err, client, done){
      if (err) {
        done();
        return reject(err);
      }

      client.query('UPDATE users SET accesstoken=$1, refreshtoken=$2, email=$3, google_name=$4 WHERE googleid=$5 RETURNING *',
      [accessToken, refreshToken, googleEmail, googleName, googleID],
      function(err, result){
        done();
        if (err) {
          reject(err);
        }
        resolve(200);
      });
    });
    });
}




// create
function create(googleID, googleEmail, googleName, accessToken, refreshToken) {
    console.log('googleID create in database')
  return new Promise(function(resolve, reject){

      pool.connect(function(err, client, done){
        if (err) {
          done();
          return reject(err);
        }

        client.query('INSERT INTO users (googleid, accesstoken, refreshtoken, email, google_name) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                     [googleID, accessToken, refreshToken, googleEmail, googleName],
                     function(err, result){
                       done();
                       if (err) {
                         return reject(err);
                       }

                       resolve(result.rows[0]);
                     });
      });

  });
}


module.exports = {
  findById: findById,
  create: create,
  updateTokens:updateTokens
};
