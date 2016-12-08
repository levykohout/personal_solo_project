const pg = require('pg');
const url = require('url');
const params = url.parse(process.env.DATABASE_URL);
const auth = params.auth.split(':');



var config = {
  database: 'rho'
};

var pool = new pg.Pool(config);

module.exports = pool;
