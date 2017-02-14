/**
 * New node file
 */
var mysql_pool = require('mysql');
var pool  = mysql_pool.createPool({
	host     : 'db4free.net',
	user     : 'airbnb',
	password : 'airbnb',
	port     : 3306,
	database : 'airbnb',
	connectionLimit : '10',
		multipleStatements: true
});

exports.pool = pool;