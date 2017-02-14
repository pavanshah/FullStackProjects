var mongo = require("./mongo");
var mongoURL = "mongodb://apps92:shim123@ds155727.mlab.com:55727/airbnbproto";
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Users = require('../Models/user');
var Trips = require('../Models/trip');
var newAvgRating = 1;
var mq_client = require('../rpc/client');

//var winston = require('winston');

var SubmitReviewAndRating = function(req, res)
{
	console.log("inside submit review");
	
	//review and ratings inserted




	Users.update({"email":req.body.review.email}, {$push : {Reviews : {ratings : req.body.review.Reviews.ratings, feedback : req.body.review.Reviews.feedback, user_id : req.session.user.emailId} } } , function(err, user){
		//needs req.session.user.emailId for testing
		
		if (user) 
		{
			console.log("success");
			RetriveAverageRating(req, res);
			
		} else 
		{
			console.log(err);
		}
		
	})


var RetriveAverageRating = function(req,res)
{
		//average rating retrieved
		Users.findOne({"email":req.body.review.email},function(err,user){
			
			if (user) 
			{
				newAvgRating = ((user.avgrating + req.body.review.Reviews.ratings)/(user.Reviews.length));
				UpdateAverageRating(req, res, newAvgRating);
				console.log("avg rating "+user.avgrating);
				console.log("no of reviews "+user.Reviews.length);
				console.log("New rating "+newAvgRating);
				
			} else 
			{
				console.log(err);
			}
		})
}
	

var UpdateAverageRating = function(req, res, newAvgRating)
{
	console.log("here "+newAvgRating);
	
	Users.update({email:req.body.review.email}, {$set : {avgrating : newAvgRating }}, function(err, user){
		if (user) 
		{
			res.status(200);
			res.json({"result":"Rating changed"});
		} else 
		{
			console.log(err);
		}
		
	})
}
	
	
}

var GetReviews = function(req, res)
{
	//find all reviews


	msg_payload = {
		"func" : "getReview",
		"email" : req.body.review.email
	}

	mq_client.make_request("review_queue", msg_payload, function(err, response) {
		if (!err) 
		{
			var json_response = {avgrating:response.user.avgrating, reviews : response.user.Reviews};
			res.send(json_response);
			
		} else 
		{
			console.log(err);
		}
	});

/*	Users.findOne({"email":req.body.review.email},function(err,user){
		
		if (user) 
		{
			var json_response = {avgrating:user.avgrating, reviews : user.Reviews};
			res.send(json_response);
			
		} else 
		{
			console.log(err);
		}
	})*/
}


/*var getTripRatings = function(req,res) {
	

}*/

var getRatingsForTrip = function(data,callback) {
	console.log("bhakdbhjdvshfwhfvwhvfhzv"+data.body.host_id+""+data.body.emailId);
	Users.findOne({$and: [{"user_id":data.body.host_id},{"Reviews":{$elemMatch:{"user_id":data.body.emailId}}}]}, function(err, user){
		if(err)
		{
			//res.status(401).json({"result":"Not able to fetch user ratings"});
			console.log("in review error");
			callback({"result":null});
		}
		else
		{
			console.log("in review error else:"+user);
			var a=[];
			var flag=1;
			if(user != null)
			{
			a=user.Reviews;
			a.forEach(function(element){
				if(element.user_id == data.body.emailId)
				{
					console.log("ratingksasakaksahs"+element);
					/*res
					.status(200)
					.json({"result":element});*/
					flag = 0;
					callback({"result":element});
					
				}
			});
			if(flag == 1)
			{
				console.log("inside no review found");
				callback({"result":null});
			}
			if(user.Reviews.length == 0)
			{
/*				res.
				status(200).
				json({"result":null});*/
				callback({"result":null});
			}
		}
		else
		{
			console.log("inside error else user null");
			callback({"result":null});
		}

			/*console.log("ratingksasakaksahs"+user);
			res
			.status(200)
			.json({"result":user});*/
		}
	});
}
var hostReviewSubmit = function(req, res) {
	console.log("review submit"+req.body);
	var query = {"trip_id":req.body.trip_id};
	msg_payload = {
		"func":	"hostReviewSubmit",
		"trip_id":req.body.trip_id,
		"ratings" : req.body.rate,
		"feedback" : req.body.review,
		"photo" : req.body.photo
	}

	mq_client.make_request("review_queue", msg_payload, function(err, response) {
		if(err)
		{
			res.status(401).json({"result":"no user found"});
		}
		else
		{
			res.status(200).json({"result":"review submitted"});
		}
	});
	
}
var submitReviewForTrip = function(req, res) {
	console.log("review submit"+req.body);

	var query = {"trip_id":req.body.trip_id};



	msg_payload = {
		"func":"submitReviewForTrip",
		"trip_id":req.body.trip_id,
		"ratings" : req.body.rate,
		"feedback" : req.body.review,
		"photo" : req.body.photo
	}

	mq_client.make_request("review_queue", msg_payload, function(err, response) {
		if(err)
		{
			res.status(401).json({"result":"no user found"});
		}
		else
		{
			res.status(200).json({"result":"review submitted"});
		}
	});


	//winston.remove(winston.transports.File);
	//winston.add(winston.transports.File, { filename: 'public/LogFiles/AirbnbAnalysis.json' });
	//winston.log('info', 'review button clicked', { page_name : 'review_page', user_email : req.session.user.emailId, city : req.session.user.address.city, state : req.session.user.address.state, country : req.session.user.address.country});

	//winston.remove(winston.transports.File);
	//winston.add(winston.transports.File, { filename: 'public/LogFiles/UserTracking.json' });
	//req.session.user.user_tracker.push("review_page");
	//winston.log('info', 'user tracker updated', {session_id : req.session.user.session_id, user_email : req.session.user.emailId, "user_tracker" : req.session.user.user_tracker});

	//winston.remove(winston.transports.File);
	//winston.add(winston.transports.File, { filename: 'public/LogFiles/PropertyReviewsAnalysis.json' });
	//winston.log('info', 'review submitted', { rating : req.body.rate, property_id : req.body.property.property_id , host_id : req.body.host_id, user_email : req.session.user.emailId, city : req.session.user.address.city, state : req.session.user.address.state, country : req.session.user.address.country});

/*	Trips.update(query, {$push : {Reviews : {ratings : req.body.rate, feedback : req.body.review, photo : req.body.photo}}}, function(err,response) {
		if(err)
		{
			res.status(401).json({"result":"no user found"});
		}
		else
		{
			res.status(200).json({"result":"review submitted"});
		}
	});*/

	//res.status(200).json({"result":"submitted"});
}


exports.SubmitReviewAndRating = SubmitReviewAndRating;
exports.GetReviews = GetReviews;
exports.getRatingsForTrip = getRatingsForTrip;
exports.submitReviewForTrip = submitReviewForTrip;
exports.hostReviewSubmit = hostReviewSubmit;
