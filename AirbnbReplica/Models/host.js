var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Hosts = new Schema({
	host_id : String,
	type : Number,
	firstname: String,
	lastname : String,
	email: String,
	birthdate : Date,
	password : String,
	address : {
		street: String,
		state: String,
		city:String,
		zipcode:String,
		country:String
				 },
	phone : Number,
	carddetails : {
		creditcard : Number,
		firstname : String,
		lastname : String,
		cvv : Number,
		expirymonth : Number,
		expiryyear : Number,
		postalcode : Number,
		country : String
	},
	profilepic : {data : Buffer, contentType : String},
	avgrating : Number,
	Reviews : [{ratings : Number, feedback : String, trip_id: String, user_id : String}]
				 
});
module.exports = mongoose.model("Hosts",Hosts);