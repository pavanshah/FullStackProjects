var mongo = require("./mongo");
var mongoURL = "mongodb://apps92:shim123@ds155727.mlab.com:55727/airbnbproto";
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Trip = require('./Models/trip');

var createTrip = function(msg,callback) {
	var trip_data = msg.trip_data;
	trip = Trip(trip_data);

	//trip.save();

	trip.save(function(err,result){

		if(!err){
			console.log(result);
			callback(null,{"status":200,"result":"Trip created", "trip_details":result});
			}
		else{
			console.log(err);
			callback(err,{"status":400,"result":"Bad Request"});
		}
	});
}


var getTrips = function(msg,callback) {


	Trip.find({"user_emailId":msg.user_emailId}, function(err,result) {
		if(!err){
			console.log(result);
			callback(null,{"status":200,"result":"Trips fetched", "trips":result});
			}
		else{
			console.log(err);
			callback(err,{"status":400,"result":"Bad Request"});
		}
	});
}

exports.createTrip = createTrip;
exports.getTrips = getTrips;