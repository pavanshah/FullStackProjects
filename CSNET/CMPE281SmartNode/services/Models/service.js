var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Service = new Schema({
	service_id : String,
	servicename: String,
	owner : String,
	description : String
});


module.exports = mongoose.model("Services",Service);