var mongo = require("./mongo");
var mongoURL = "mongodb://apps92:shim123@ds155727.mlab.com:55727/airbnbproto";
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Trip = require('./Models/trip');
var User = require('./Models/user');


var submitReviewForTrip = function(msg,callback) {


	Trip.update({"trip_id":msg.trip_id}, {$push : {Reviews : {ratings : msg.ratings, feedback : msg.feedback, photo : msg.photo}}}, function(err,result) {
		if(!err){
			console.log(result);
			callback(null,{"status":200,"result":"Review Submitted"});
			}
		else{
			console.log(err);
			callback(err,{"status":400,"result":"Bad Request"});
		}
	});

};

var submitHostReview = function(msg,callback) {

console.log("inside submit host review");
console.log(msg.trip_id);
console.log(msg.ratings);
console.log(msg.feedback);
console.log(msg.photo);
Trip.update({"trip_id":msg.trip_id}, {$push : {HostReviews : {ratings : msg.ratings, feedback : msg.feedback,photo : msg.photo}}}, function(err,result) {

		if(!err){
			console.log(result);
			console.log("updated");
			callback(null,{"status":200,"result":"Host Review Submitted"});
			}
		else{
			console.log(err);
			callback(err,{"status":400,"result":"Bad Request"});
		}
	});

};




var getReview = function(msg, callback) {

	Users.findOne({"email":msg.email},function(err,user){
		if(!err){
			console.log(result);
			callback(null,{"status":200,"result":"Review Submitted", "user":user});
			}
		else{
			console.log(err);
			callback(err,{"status":400,"result":"Bad Request"});
		}
	})
}

exports.submitReviewForTrip = submitReviewForTrip;
exports.getReview = getReview;
exports.submitHostReview = submitHostReview;