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
module.exports = pool;
