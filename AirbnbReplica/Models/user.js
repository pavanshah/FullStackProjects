var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Users = new Schema({
	user_id : String,
	firstname: String,
	lastname : String,
	email: String,
	birthdate : Date,
	password : String,
	gender : String,
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
	profilepic :  String,
	video :  String,
	UserType : String,
	user_status:String,
	avgrating : Number,
	Reviews : [{ratings : Number, feedback : String, trip_id: String, user_id : String}]	 
});

Users.methods.isActive = function(user) {
	console.log("checking if active:"+(user.user_status == "active"));
	return user.user_status == "active";
};
module.exports = mongoose.model("Users",Users);