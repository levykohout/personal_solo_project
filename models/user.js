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


//
// // find by id
// function findById(id) {
//   return new Promise(function(resolve, reject){
//     pool.connect(function(err, client, done){
//       if (err) {
//         done();
//         return reject(err);
//       }
//
//       client.query('SELECT * FROM users WHERE id=$1',
//       [id],
//       function(err, result){
//         done();
//         if (err) {
//           reject(err);
//         }
//
//         resolve(result.rows[0]);
//       });
//     });
//   });
// }

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

// // compare password
// function comparePassword(user, passwordToCompare) {
//   return new Promise(function(resolve){
//     bcrypt.compare(passwordToCompare, user.password, function(err, match){
//       if (err) {
//         console.log('Error comparing password', err);
//         return resolve(false);
//       }
//
//       resolve(match);
//     });
//   });
// }

module.exports = {
  findById: findById,
  create: create,
};
