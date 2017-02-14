var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Trip = new Schema({
	trip_id : String,
	property : {
		property_id : String,
		propertyTitle : String,
		description : String,
		propertyPictures : [String],
		qty : Number,
		category : String
	},
	qty : Number,
	host_id : String,
	user_id : String,
	user_emailId : String,
	bill : {
		billing_id: String,
		trip_amount : Number
	},	
	trip_start_date : Date,
	trip_end_date : Date,
	Reviews : [{
		ratings : Number, 
		feedback : String,
		photo : String
	}],	
	
	HostReviews : [{
		ratings : Number, 
		feedback : String,
		photo : String
	}]	
});
module.exports = mongoose.model("Trip",Trip);