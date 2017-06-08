var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var messageSchema = {
	timeStamp : Date, 
		recepient: String, 
		sender : String, 
		message : String, 
		subject : String
}

var cartSchema = {
	service_id : String, 
		service_name : String, 
		status : String, 
		user_description : String
}


var Users = new Schema({
	firstname: String,
	lastname : String,
	email: String,
	password : String,
	gender : String,
	phone : Number,
	cluster : String,
	Service : String,
	UserType : String,//ClusterOwner, Part, ServiceOwner
	Message : [messageSchema],
	status : String,
	service_cart : [cartSchema]
});


module.exports = mongoose.model("Users",Users);