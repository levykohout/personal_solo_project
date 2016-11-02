// const mongoose = require('mongoose');
const router = require('express').Router();
// const bcrypt = require('bcrypt');
// const SALT_ROUNDS = 10;
const pool = require('../db/connection');

// find by username
function findById(googleID, googleEmail, accessToken, refreshToken) {
    console.log('found googleID',googleID);
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

function updateTokens(googleID, googleEmail, accessToken, refreshToken){
    console.log('This is a refreshToken',refreshToken);
    console.log('This is a accessToken',accessToken);
    return new Promise(function(resolve, reject){
    pool.connect(function(err, client, done){
      if (err) {
        done();
        return reject(err);
      }

      client.query('UPDATE users SET accesstoken=$1, refreshtoken=$2, email=$3 WHERE googleid=$4 RETURNING *',
      [accessToken, refreshToken, googleEmail, googleID],
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
function create(googleID, googleEmail, accessToken, refreshToken) {
    console.log('googleID create in database')
  return new Promise(function(resolve, reject){

      pool.connect(function(err, client, done){
        if (err) {
          done();
          return reject(err);
        }

        client.query('INSERT INTO users (googleid, accesstoken, refreshtoken, email) VALUES ($1, $2, $3, $4) RETURNING *',
                     [googleID, accessToken, refreshToken, googleEmail],
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
