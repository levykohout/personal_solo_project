// const mongoose = require('mongoose');
const router = require('express').Router();
// const bcrypt = require('bcrypt');
// const SALT_ROUNDS = 10;
const pool = require('../db/connection');

// find by username
function findById(googleID, accessToken, refreshToken) {
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

function updateTokens(googleID, accessToken, refreshToken){
    console.log('This is a refreshToken',refreshToken);
    console.log('This is a accessToken',accessToken);
    return new Promise(function(resolve, reject){
    pool.connect(function(err, client, done){
      if (err) {
        done();
        return reject(err);
      }

      client.query('UPDATE users SET accesstoken=$1, refreshtoken=$2 WHERE googleid=$3 RETURNING *',
      [accessToken, refreshToken, googleID],
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
function create(googleID, accessToken, refreshToken) {
    console.log('googleID create in database')
  return new Promise(function(resolve, reject){

      pool.connect(function(err, client, done){
        if (err) {
          done();
          return reject(err);
        }

        client.query('INSERT INTO users (googleid, accesstoken, refreshtoken) VALUES ($1, $2, $3) RETURNING *',
                     [googleID, accessToken,refreshToken],
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
