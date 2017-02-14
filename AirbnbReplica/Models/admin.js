var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Admin = new Schema({
	admin_id : String,
	type : Number,
	firstname: String,
	lastname : String,
	email: String,	
	password : String,
	address : {
		street: String,
		state: String,
		city:String,
		zipcode:String,
		country:String
				 },
	phone : Number
})

module.exports = mongoose.model("Admin",Admin);
