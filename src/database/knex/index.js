const config = require('../../../knexfile');
const knex = require('knex');

const conextion = knex(config.development);

module.exports = conextion;