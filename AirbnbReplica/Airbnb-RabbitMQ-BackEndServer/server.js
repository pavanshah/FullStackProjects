	//super simple rpc server example
var mongoose = require('mongoose');
var amqp = require('amqp')
, util = require('util');
var property = require('./services/properties');
var user = require('./services/user');

var login = require('./services/login');
var bill = require('./services/bill');
var trip = require('./services/trip');
var review = require('./services/review');

//require('./services/mongo')();



var mongoSessionConnectURL = "mongodb://apps92:shim123@ds113668.mlab.com:13668/airbnbprod";
var expressSession = require("express-session");
var mongoStore = require("connect-mongo")(expressSession);
var mongo = require("./services/mongo");

var cnn = amqp.createConnection({host:'127.0.0.1'});


var express = require('express');
var app = express();
app.use(expressSession({
  secret: 'cmpe273_airbnb_team9',
  resave: false,  //don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  duration: 30 * 60 * 1000,    
  activeDuration: 5 * 60 * 1000,
  store: new mongoStore({
    url: mongoSessionConnectURL
  })
}));
// var cookieParser = require('cookie-parser');
// var bodyParser = require('body-parser');
// var passport = require('passport');
// require('./services/passport')(passport);
// app.use(app.router);
// app.use(passport.initialize());

mongoose.connect(mongoSessionConnectURL, function(){
	console.log('Connected to mongo at: ' + mongoSessionConnectURL);
});

cnn.on('ready', function(){
	console.log("listening on login_queue");

	/*cnn.queue('ebay_login_queue', function(q){
		q.subscribe(function(message, headers, deliveryInfo, m){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			login.handle_request(message, function(err,res){

				//return index sent
				cnn.publish(m.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
		});
	});*/



	console.log("listening on User Queue");
	cnn.queue('user_queue',function(q)

	{
		q.subscribe(function(message, headers, deliveryInfo, m){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			


			switch(message.func){

				case "Authenticate":

					user.authenticate(message,function(err,res){

						console.log("printing response");
						console.log(res);
							//return index sent
							cnn.publish(m.replyTo, res, {
								contentType:'application/json',
								contentEncoding:'utf-8',
								correlationId:m.correlationId
							});
					});
				break;

				case "SignUp":
					user.SignUp(message,function(err,res){

						//return index sent
							cnn.publish(m.replyTo, res, {
								contentType:'application/json',
								contentEncoding:'utf-8',
								correlationId:m.correlationId
							});
					});
				break;	

				case "UpdateUser":
					user.updateProfile(message,function(err,res){

						cnn.publish(m.replyTo, res, {
								contentType:'application/json',
								contentEncoding:'utf-8',
								correlationId:m.correlationId
							});
					});
					break;
				case "getUserProfile":
					user.getUserProfile(message,function(err,res){

						cnn.publish(m.replyTo, res, {
								contentType:'application/json',
								contentEncoding:'utf-8',
								correlationId:m.correlationId
							});
					});
				break;
				
					
				case "getHostTrips":
					user.getHostTrip(message,function(err,res){

					cnn.publish(m.replyTo, res, {
								contentType:'application/json',
								contentEncoding:'utf-8',
								correlationId:m.correlationId
							});
					});
				break;
				
				
				

		};
	});
 	});

	
	
	console.log("listening on Host Queue");
	cnn.queue('host_queue',function(q)

	{
		q.subscribe(function(message, headers, deliveryInfo, m){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			


			switch(message.func){

				case "getHost":
					user.getHostProfile(message,function(err,res){

					cnn.publish(m.replyTo, res, {
								contentType:'application/json',
								contentEncoding:'utf-8',
								correlationId:m.correlationId
							});
					});
					
				case "updateHostDetails":
					user.updateHostProfileDetails(message,function(err,res){

					cnn.publish(m.replyTo, res, {
								contentType:'application/json',
								contentEncoding:'utf-8',
								correlationId:m.correlationId
							});
					});
				case "updateHostCardDetails":
					user.updateHostProfileCardDetails(message,function(err,res){

					cnn.publish(m.replyTo, res, {
								contentType:'application/json',
								contentEncoding:'utf-8',
								correlationId:m.correlationId
							});
					});
				break;
			};
		
	});
 	});
	
	
	
	
	
	
	console.log("listening on Property Queue");
	cnn.queue('property_queue',function(q)

	{
		q.subscribe(function(message, headers, deliveryInfo, m){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			

			switch(message.func){

				case "createProperty":

					property.createProperty(message,function(err,res){

						console.log("printing response");
						console.log(res);
							//return index sent
							cnn.publish(m.replyTo, res, {
								contentType:'application/json',
								contentEncoding:'utf-8',
								correlationId:m.correlationId
							});
					});
				break;

				case "SearchPropertyByDistance":
					property.SearchPropertyByDistance(message,function(err,res){

						console.log("printing response");
						console.log(res);
							//return index sent
							cnn.publish(m.replyTo, res, {
								contentType:'application/json',
								contentEncoding:'utf-8',
								correlationId:m.correlationId
							});
					});
				break;
				case "UpdateProperty":
					property.UpdateProperty(message,function(err,res){

						console.log("printing response");
						console.log(res);
						//return index sent
							cnn.publish(m.replyTo, res, {
								contentType:'application/json',
								contentEncoding:'utf-8',
								correlationId:m.correlationId
							});

					});
				break;

				case "SearchPropertyById":
					property.SearchPropertyById(message,function(err,res){
						console.log("printing response");
						console.log(res);
						//return index sent
							cnn.publish(m.replyTo, res, {
								contentType:'application/json',
								contentEncoding:'utf-8',
								correlationId:m.correlationId
							});

					});
				break;

				case "BookProperty":
					property.BookProperty (message,function(err,res){

						console.log("printing response");
						console.log(res);
						//return index sent
							cnn.publish(m.replyTo, res, {
								contentType:'application/json',
								contentEncoding:'utf-8',
								correlationId:m.correlationId
							});

					});
				break;

				case "getAuctionableProperties":
					property.getAuctionableProperties (message,function(err,res){

						console.log("printing response");
						console.log(res);
						//return index sent
							cnn.publish(m.replyTo, res, {
								contentType:'application/json',
								contentEncoding:'utf-8',
								correlationId:m.correlationId
							});

					});
				break;

				case "getMaxBid":
					property.getMaxBid (message,function(err,res){

						console.log("printing response");
						console.log(res);
						//return index sent
							cnn.publish(m.replyTo, res, {
								contentType:'application/json',
								contentEncoding:'utf-8',
								correlationId:m.correlationId
							});

					});
				break;

				case "getUserBids":
					property.getUserBids (message,function(err,res){

						console.log("printing response");
						console.log(res);
						//return index sent
							cnn.publish(m.replyTo, res, {
								contentType:'application/json',
								contentEncoding:'utf-8',
								correlationId:m.correlationId
							});

					});
				break;
			}
		})
	});

	console.log("listening on Billing Queue");
	cnn.queue('bill_queue',function(q)

	{

		q.subscribe(function(message, headers, deliveryInfo, m){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			

			switch(message.func){

				case "GenerateBill":
				bill.GenerateBill(message,function(err,res){

					console.log("printing Bill response");
						console.log(res);
						//return index sent
							cnn.publish(m.replyTo, res, {
								contentType:'application/json',
								contentEncoding:'utf-8',
								correlationId:m.correlationId
							});
				})
				break;

			}
	});

  });

	console.log("listening on Trip Queue");
	cnn.queue('trip_queue',function(q)

	{

		q.subscribe(function(message, headers, deliveryInfo, m){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			

			switch(message.func){

				case "createTrip":
				trip.createTrip(message,function(err,res){

					console.log("printing Trip response");
						console.log(res);
						//return index sent
							cnn.publish(m.replyTo, res, {
								contentType:'application/json',
								contentEncoding:'utf-8',
								correlationId:m.correlationId
							});
				})
				break;

				case "getTrips":
				trip.getTrips(message,function(err,res){

					console.log("printing Trip response");
						console.log(res);
						//return index sent
							cnn.publish(m.replyTo, res, {
								contentType:'application/json',
								contentEncoding:'utf-8',
								correlationId:m.correlationId
							});
				})
				break;

			}
	});

  });


	console.log("listening on Review Queue");
	cnn.queue('review_queue',function(q)

	{

		q.subscribe(function(message, headers, deliveryInfo, m){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			

			switch(message.func){

				case "submitReviewForTrip":
				review.submitReviewForTrip(message,function(err,res){

					console.log("printing Review response");
						console.log(res);
						//return index sent
							cnn.publish(m.replyTo, res, {
								contentType:'application/json',
								contentEncoding:'utf-8',
								correlationId:m.correlationId
							});
				})
				break;

				case "getReview":
				review.getReview(message,function(err,res){

					console.log("printing Review response");
						console.log(res);
						//return index sent
							cnn.publish(m.replyTo, res, {
								contentType:'application/json',
								contentEncoding:'utf-8',
								correlationId:m.correlationId
							});
				})
				break;
				
				case "hostReviewSubmit":
					review.submitHostReview(message,function(err,res){

						console.log("hostReviewSubmit Review response");
							console.log(res);
							//return index sent
								cnn.publish(m.replyTo, res, {
									contentType:'application/json',
									contentEncoding:'utf-8',
									correlationId:m.correlationId
								});
					})
					break;
			}
	});

  });




});