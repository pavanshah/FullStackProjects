var mongo = require("./mongo");
var mongoURL = "mongodb://apps92:shim123@ds155727.mlab.com:55727/airbnbproto";
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Trips = require('../Models/trip');
var Property = require('../Models/property');
var uniqueIDGenerator = require('../routes/uniqueIDGenerator');
var reviewFn = require('./review');
var globalTripObject ;
var globalProperty;
var globalTripObjectForReview;
var mq_client = require('../rpc/client');

var getTrips = function (req,res) {
	var userId = req.session.user.emailId;
	console.log(req.session.user);
	query = {"user_emailId":userId};


msg_payload = {
	"func":"getTrips",
	"user_emailId":userId
}

mq_client.make_request("trip_queue", msg_payload, function(err,response) {
	if(!err){


			globalTripObjectForReview = response.trips;
/*			var i =0;
			var length = trips.length;
			console.log("length"+length);





			var temp = function(argument) {
				if(argument < length)
				{
					if(!globalTripObjectForReview[argument].property.propertyPictures || globalTripObjectForReview[argument].property.propertyPictures.length==0){
                	globalTripObjectForReview[argument].property.propertyPictures = ["public/images/room-list-images/room-1-a.png"];
              	}
              	console.log("ljabfhaefefwefd");
				var data = {"body":{"host_id":globalTripObjectForReview[argument].host_id, "emailId":req.session.user.emailId }};
				reviewFn.getRatingsForTrip(data,function(review) {
					if(review.result != null)
					{
						console.log("ljabfhadlahkdbakhbvdvdvasjdgasvdj");
						globalTripObjectForReview[argument].rating = 1;
	              		globalTripObjectForReview[argument].rate = review.result.ratings;
	              		globalTripObjectForReview[argument].review = review.result.feedback;
	              		globalTripObjectForReview[argument].reviewDiv = 0;

					}
					else
					{					           
						console.log("hkadbfhcsfcgvljabfhad");

						globalTripObjectForReview[argument].rating = 0;
	              		globalTripObjectForReview[argument].rate = 1;
	              		globalTripObjectForReview[argument].review = "";
	              		globalTripObjectForReview[argument].reviewDiv = 0;
					}
				});
				temp(argument++);
				}

			}


			temp(0);*/



			
/*			globalTripObjectForReview.forEach(function(globalTripObjectForReview) {
				console.log("ljabfhad");
				if(!globalTripObjectForReview.property.propertyPictures || globalTripObjectForReview.property.propertyPictures.length==0){
                	globalTripObjectForReview.property.propertyPictures = ["public/images/room-list-images/room-1-a.png"];
              	}
              	console.log("ljabfhaefefwefd");
				var data = {"body":{"host_id":globalTripObjectForReview.host_id, "emailId":req.session.user.emailId }};
				reviewFn.getRatingsForTrip(data,function(review) {
					if(review.result != null)
					{
						console.log("ljabfhadlahkdbakhbvdvdvasjdgasvdj");
						globalTripObjectForReview.rating = 1;
	              		globalTripObjectForReview.rate = review.result.ratings;
	              		globalTripObjectForReview.review = review.result.feedback;
	              		globalTripObjectForReview.reviewDiv = 0;

					}
					else
					{					           
						console.log("hkadbfhcsfcgvljabfhad");

						globalTripObjectForReview.rating = 0;
	              		globalTripObjectForReview.rate = 1;
	              		globalTripObjectForReview.review = "";
	              		globalTripObjectForReview.reviewDiv = 0;
					}
				});
			});*/

/*			var data = {"body":{"host_id":trips., "emailId":req.session.user.emailId }};
			reviewFn.getRatingsForTrip();*/


			console.log("trip finction:"+globalTripObjectForReview.rating);
			console.log("jugaad"+globalTripObjectForReview);
			res.status(200).
			json(response.trips);
		}
		else
		{
			console.log("Error in fetching user trips:"+err);
			res.status(400).
			json({"response":"Some error occurred"});
			
		}
});


/*	Trips.find(query,function(err, trips){
		if(!err){


			globalTripObjectForReview = trips;*/
/*			var i =0;
			var length = trips.length;
			console.log("length"+length);





			var temp = function(argument) {
				if(argument < length)
				{
					if(!globalTripObjectForReview[argument].property.propertyPictures || globalTripObjectForReview[argument].property.propertyPictures.length==0){
                	globalTripObjectForReview[argument].property.propertyPictures = ["public/images/room-list-images/room-1-a.png"];
              	}
              	console.log("ljabfhaefefwefd");
				var data = {"body":{"host_id":globalTripObjectForReview[argument].host_id, "emailId":req.session.user.emailId }};
				reviewFn.getRatingsForTrip(data,function(review) {
					if(review.result != null)
					{
						console.log("ljabfhadlahkdbakhbvdvdvasjdgasvdj");
						globalTripObjectForReview[argument].rating = 1;
	              		globalTripObjectForReview[argument].rate = review.result.ratings;
	              		globalTripObjectForReview[argument].review = review.result.feedback;
	              		globalTripObjectForReview[argument].reviewDiv = 0;

					}
					else
					{					           
						console.log("hkadbfhcsfcgvljabfhad");

						globalTripObjectForReview[argument].rating = 0;
	              		globalTripObjectForReview[argument].rate = 1;
	              		globalTripObjectForReview[argument].review = "";
	              		globalTripObjectForReview[argument].reviewDiv = 0;
					}
				});
				temp(argument++);
				}

			}


			temp(0);*/



			
/*			globalTripObjectForReview.forEach(function(globalTripObjectForReview) {
				console.log("ljabfhad");
				if(!globalTripObjectForReview.property.propertyPictures || globalTripObjectForReview.property.propertyPictures.length==0){
                	globalTripObjectForReview.property.propertyPictures = ["public/images/room-list-images/room-1-a.png"];
              	}
              	console.log("ljabfhaefefwefd");
				var data = {"body":{"host_id":globalTripObjectForReview.host_id, "emailId":req.session.user.emailId }};
				reviewFn.getRatingsForTrip(data,function(review) {
					if(review.result != null)
					{
						console.log("ljabfhadlahkdbakhbvdvdvasjdgasvdj");
						globalTripObjectForReview.rating = 1;
	              		globalTripObjectForReview.rate = review.result.ratings;
	              		globalTripObjectForReview.review = review.result.feedback;
	              		globalTripObjectForReview.reviewDiv = 0;

					}
					else
					{					           
						console.log("hkadbfhcsfcgvljabfhad");

						globalTripObjectForReview.rating = 0;
	              		globalTripObjectForReview.rate = 1;
	              		globalTripObjectForReview.review = "";
	              		globalTripObjectForReview.reviewDiv = 0;
					}
				});
			});*/

/*			var data = {"body":{"host_id":trips., "emailId":req.session.user.emailId }};
			reviewFn.getRatingsForTrip();*/


/*			console.log("trip finction:"+globalTripObjectForReview.rating);
			console.log("jugaad"+globalTripObjectForReview);
			res.status(200).
			json(trips);
		}
		else
		{
			console.log("Error in fetching user trips:"+err);
			res.status(400).
			json({"response":"Some error occurred"});
			
		}
	});*/
};

/*					var tripObject = {
						//trip_id : String,
						"property" : {
							"property_id" : billResponse.property.property_id
						},
						"user_id":req.session.user.emailId ,
						"bill" : {
							"billing_id": billResponse.billing_id,
							"trip_amount" : billResponse.trip_amount
						},	
						"trip_start_date" : billResponse.from_date,
						"trip_end_date" : billResponse.to_date	
					};
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
	host_id : String,
	user_id : String,
	bill : {
		billing_id: String,
		trip_amount : Number
	},	
	trip_start_date : Date,
	trip_end_date : Date			 
});					*/

var createTrip = function (tripObject,callback) {
	//console.log("abdhakbbfkhbkhbabfhkabfbahbdkb"+tripObject);
	console.log("property_id"+tripObject.property.property_id);
	console.log("user_id"+tripObject.user_id);
	globalTripObject = tripObject;
	query = {"property_id":tripObject.property.property_id};
	var trip_id = uniqueIDGenerator.returnUniqueID();






	var msg_payload = {
		"func": "SearchPropertyById",
		"property_id":tripObject.property.property_id
	}

	mq_client.make_request("property_queue",msg_payload,function(err,response){

/*		if(err)
		{
			console.log(err);
		}
		else
		{
			if(response.status==200)
			{
				res.status(200);
				res.json(response.property);
			}
			else
			{
				res.status(400);
				res.json({"response":"Bad Request"});
			}
		}*/


		if(err)
		{
			callback({"status":400,"result":"Failed to fetch property in Create Trip"});
		}
		else if(response.status == 200)
		{
			//console.log("propertyyyyyyyyyyyy final"+propertyData);
			globalProperty = response.property;
			console.log("ljabfbhea"+globalProperty);
			//console.log("dafsrcwrrchwrvxwjfxutwefxutfvxfzxjvcfejf"+globalProperty);
			//console.log("temp000o::::::::::::"+propertyData.property_id);
			var trip_data = {
				"trip_id" : trip_id,
				"property" : {
					"property_id" : globalProperty.property_id,
					"propertyTitle" : globalProperty.propertyTitle,
					"description" : globalProperty.description,
					"propertyPictures" : globalProperty.propertyPictures,
					"qty" : globalProperty.qty,
					"category" : globalProperty.category
				},
				"host_id" : globalProperty.host_id,
				"user_id" : globalTripObject.user_id,
				"user_emailId" : globalTripObject.user_emailId,
				"qty" : globalTripObject.qty,
				"bill" : {
					"billing_id" : globalTripObject.bill.billing_id,
					"trip_amount" : globalTripObject.bill.trip_amount, 
				},
				"trip_start_date" : globalTripObject.trip_start_date,
				"trip_end_date" : globalTripObject.trip_end_date 
			};




			var msg_payload = {
				"func": "createTrip",
				"trip_data":trip_data
			}

			mq_client.make_request("trip_queue",msg_payload,function(err,response) {
				if(err)
				{
					callback({"status":400,"result":"Failed to fetch property in Create Trip"});
				}
				else
				{
					callback({"status":200,"result":"Trip Created","trip_details":response.trip_details});
				}
			});







/*			var finalTripObject = Trips(trip_data);
			console.log(finalTripObject);
			finalTripObject.save(function(err, result){
				if(err)
				{
					callback({"status":400,"result":"Failed to fetch property in Create Trip"});
				}
				else
				{
					callback({"status":200,"result":"Trip Created","trip_details":result});
				}
			});*/
		}

		else
		{
			callback({"status":400,"result":"Failed to fetch property in Create Trip"});
		}


	});







	//var fetchProperty = Property.findOne(query);
	//fetchProperty.exec(function(err,propertyData){
		/*if(err)
		{
			callback({"status":400,"result":"Failed to fetch property in Create Trip"});
		}
		else
		{
			//console.log("propertyyyyyyyyyyyy final"+propertyData);
			globalProperty = propertyData;
			//console.log("ljabfbhea"+tripObject);
			//console.log("dafsrcwrrchwrvxwjfxutwefxutfvxfzxjvcfejf"+globalProperty);
			//console.log("temp000o::::::::::::"+propertyData.property_id);
			var trip_data = {
				"trip_id" : trip_id,
				"property" : {
					"property_id" : globalProperty.property_id,
					"propertyTitle" : globalProperty.propertyTitle,
					"description" : globalProperty.description,
					"propertyPictures" : globalProperty.propertyPictures,
					"qty" : globalProperty.qty,
					"category" : globalProperty.category
				},
				"host_id" : globalProperty.host_id,
				"user_id" : globalTripObject.user_id,
				"user_emailId" : globalTripObject.user_emailId,
				"bill" : {
					"billing_id" : globalTripObject.bill.billing_id,
					"trip_amount" : globalTripObject.bill.trip_amount, 
				},
				"trip_start_date" : globalTripObject.trip_start_date,
				"trip_end_date" : globalTripObject.trip_end_date 
			};

			var finalTripObject = Trips(trip_data);
			console.log(finalTripObject);
			finalTripObject.save(function(err, result){
				if(err)
				{
					callback({"status":400,"result":"Failed to fetch property in Create Trip"});
				}
				else
				{
					callback({"status":200,"result":"Trip Created","trip_details":result});
				}
			});
		}*/
	//});

	/*
	Property.find(query, function(err,propertyData){
		if(err)
		{
			callback({"status":400,"result":"Failed to fetch property in Create Trip"});
		}
		else
		{
			console.log("propertyyyyyyyyyyyy final"+propertyData);
			globalProperty = propertyData;
			//console.log("ljabfbhea"+tripObject);
			console.log("dafsrcwrrchwrvxwjfxutwefxutfvxfzxjvcfejf"+globalProperty);
			console.log("temp000o::::::::::::"+propertyData.property_id);
			var trip_data = {
				"trip_id" : trip_id,
				"property" : {
					"property_id" : "333",//globalProperty.property_id,
					"propertyTitle" : globalProperty.propertyTitle,
					"description" : globalProperty.description,
					"propertyPictures" : globalProperty.propertyPictures,
					"qty" : globalProperty.qty,
					"category" : globalProperty.category
				},
				"host_id" : globalProperty.host_id,
				"user_id" : globalTripObject.user_id,
				"bill" : {
					"billing_id" : globalTripObject.bill.billing_id,
					"trip_amount" : globalTripObject.bill.trip_amount, 
				},
				"trip_start_date" : globalTripObject.trip_start_date,
				"trip_end_date" : globalTripObject.trip_end_date 
			};

			var finalTripObject = Trips(trip_data);
			console.log(finalTripObject);
			finalTripObject.save(function(err, result){
				if(err)
				{
					callback({"status":400,"result":"Failed to fetch property in Create Trip"});
				}
				else
				{
					callback({"status":200,"result":"Trip Created","trip_details":result});
				}
			});
		}
	});
*/

}



exports.getTrips = getTrips;
exports.createTrip = createTrip;