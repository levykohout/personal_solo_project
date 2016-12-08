const pg = require('pg');
const url = require('url');


var config = {
  database: 'rho'
};

var pool = new pg.Pool(config);

module.exports = pool;
