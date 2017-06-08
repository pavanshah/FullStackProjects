	//super simple rpc server example
var mongoose = require('mongoose');
var amqp = require('amqp')
, util = require('util');


//require('./services/mongo')();

var mongoSessionConnectURL = "mongodb://vjzaveri:vjzaveri@ds133961.mlab.com:33961/csnet";

var expressSession = require("express-session");
var mongoStore = require("connect-mongo")(expressSession);
var mongo = require("./services/mongo");

//var cnn = amqp.createConnection({host:'127.0.0.1'});
var cnn = amqp.createConnection({url: "amqp://vansh:vansh@ec2-54-202-109-232.us-west-2.compute.amazonaws.com"});

cnn.on('error', function(e) {
  console.log("Error from amqp: ", e);
});

var service = require('./services/service');

var serviceowner = require('./services/serviceowner');

var cluster = require('./services/cluster');

var login = require('./services/login');
var moderator = require('./services/moderator');
var admin = require('./services/admin');

var express = require('express');

var app = express();
app.use(expressSession({
  secret: 'cmpe281_test',
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

				case "sign_in_service":

					login.login_request(message,function(err,res){

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

				case "sign_up_service":
					console.log("inside");
					login.signup_request(message,function(err,res){

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

				case "request_new_service":

					service.requestNewService(message,function(err,res){

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
				
				case "fetch_available_services":

					service.fetchAvailableServices(message,function(err,res){

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
							

			};
	});
 	});

 	console.log("listening on cluster Queue");
	cnn.queue('cluster_queue',function(q)

	{
		q.subscribe(function(message, headers, deliveryInfo, m){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			


			switch(message.func){



				case "create_new_cluster":

					cluster.createCluster(message,function(err,res){

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
							

		};
	});
 	});

 	console.log("listening on Service Queue");
	cnn.queue('service_queue',function(q)

	{
		q.subscribe(function(message, headers, deliveryInfo, m){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			


			switch(message.func){



				case "create_new_service":

					service.createService(message,function(err,res){

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
							

		};
	});
 	});
	
	console.log("listening on moderator Queue");
	cnn.queue('moderator_queue',function(q)
	{
		q.subscribe(function(message, headers, deliveryInfo, m){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			
			switch(message.func){

				case "fetchUsersToBeApproved":
					console.log("inside moderator_queue fetchUsersToBeApproved");
					moderator.fetchUsersToBeApproved(message,function(err,res){

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

					case "approveUser":
					console.log("inside moderator_queue approveUser");
					moderator.approveUser(message,function(err,res){

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

					case "rejectUser":
					console.log("inside moderator_queue rejectUser");
					moderator.rejectUser(message,function(err,res){

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

		};
	});
 	});

	
	
	console.log("listening on Admin Queue");
	cnn.queue('admin_queue',function(q)

	{
		q.subscribe(function(message, headers, deliveryInfo, m){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			


			switch(message.func){

				case "get_all_moderators":
					admin.get_all_moderators(message,function(err,res){

						console.log("Getting all moderators..");
						console.log(res);
							//return index sent
							cnn.publish(m.replyTo, res, {
								contentType:'application/json',
								contentEncoding:'utf-8',
								correlationId:m.correlationId
							});
					});	
					break;		

				case "get_all_service_owners":
					admin.get_all_service_owners(message,function(err,res){

						console.log("Getting all service owners..");
						console.log(res);
							//return index sent
							cnn.publish(m.replyTo, res, {
								contentType:'application/json',
								contentEncoding:'utf-8',
								correlationId:m.correlationId
							});
					});	
					break;		

				case "get_all_services":
					admin.get_all_services(message,function(err,res){

						console.log("Getting all services..");
						console.log(res);
							//return index sent
							cnn.publish(m.replyTo, res, {
								contentType:'application/json',
								contentEncoding:'utf-8',
								correlationId:m.correlationId
							});
					});	
					break;	
								

				case "cluster_count":

					admin.cluster_count(message,function(err,res){

						console.log("Getting cluster count..");
						console.log(res);
							//return index sent
							cnn.publish(m.replyTo, res, {
								contentType:'application/json',
								contentEncoding:'utf-8',
								correlationId:m.correlationId
							});
					});
					break;	

				case "service_count":

					admin.service_count(message,function(err,res){

						console.log("Getting service count..");
						console.log(res);
							//return index sent
							cnn.publish(m.replyTo, res, {
								contentType:'application/json',
								contentEncoding:'utf-8',
								correlationId:m.correlationId
							});
					});
					break;	


				case "user_count":

					admin.user_count(message,function(err,res){

						console.log("Getting user count..");
						console.log(res);
							//return index sent
							cnn.publish(m.replyTo, res, {
								contentType:'application/json',
								contentEncoding:'utf-8',
								correlationId:m.correlationId
							});
					});	
					break;	

				case "top_ten_clusters":

					admin.top_ten_clusters(message,function(err,res){

						console.log("Getting top 10 cluster count..");
						console.log(res);
							//return index sent
							cnn.publish(m.replyTo, res, {
								contentType:'application/json',
								contentEncoding:'utf-8',
								correlationId:m.correlationId
							});
					});	
					break;

				case "get_all_clusters":

					admin.get_all_clusters(message,function(err,res){

						console.log("Getting all clusters..");
						console.log(res);
							//return index sent
							cnn.publish(m.replyTo, res, {
								contentType:'application/json',
								contentEncoding:'utf-8',
								correlationId:m.correlationId
							});
					});	
					break;		

				case "get_cluster":

					admin.get_cluster(message,function(err,res){

						console.log("Getting cluster..");
						console.log(res);
							//return index sent
							cnn.publish(m.replyTo, res, {
								contentType:'application/json',
								contentEncoding:'utf-8',
								correlationId:m.correlationId
							});
					});		
					break;


					case "remove_cluster":

					admin.remove_cluster(message,function(err,res){

						console.log("Removing cluster..");
						console.log(res);
							//return index sent
							cnn.publish(m.replyTo, res, {
								contentType:'application/json',
								contentEncoding:'utf-8',
								correlationId:m.correlationId
							});
					});		
					break;


					case "remove_service":

					admin.remove_service(message,function(err,res){

						console.log("Removing service..");
						console.log(res);
							//return index sent
							cnn.publish(m.replyTo, res, {
								contentType:'application/json',
								contentEncoding:'utf-8',
								correlationId:m.correlationId
							});
					});		
					break;




				case "update_cluster":

					admin.update_cluster(message,function(err,res){

						console.log("Updating cluster..");
						console.log(res);
							//return index sent
							cnn.publish(m.replyTo, res, {
								contentType:'application/json',
								contentEncoding:'utf-8',
								correlationId:m.correlationId
							});
					});		
					break;

				case "get_service":

					admin.get_service(message,function(err,res){

						console.log("Getting service..");
						console.log(res);
							//return index sent
							cnn.publish(m.replyTo, res, {
								contentType:'application/json',
								contentEncoding:'utf-8',
								correlationId:m.correlationId
							});
					});		
					break;

				case "update_service":

					admin.update_service(message,function(err,res){

						console.log("Updating service..");
						console.log(res);
							//return index sent
							cnn.publish(m.replyTo, res, {
								contentType:'application/json',
								contentEncoding:'utf-8',
								correlationId:m.correlationId
							});
					});		
					break;


				case "create_new_cluster":
					admin.create_new_cluster(message,function(err,res){

						console.log("Creating new cluster..");
						console.log(res);
							//return index sent
							cnn.publish(m.replyTo, res, {
								contentType:'application/json',
								contentEncoding:'utf-8',
								correlationId:m.correlationId
							});
					});	
					break;			

				case "create_new_service":
					admin.create_new_service(message,function(err,res){

						console.log("Creating new service..");
						console.log(res);
							//return index sent
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
  
  console.log("listening on serviceowner queue");
	cnn.queue('serviceowner_queue',function(q)
	{
		q.subscribe(function(message, headers, deliveryInfo, m){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			
			switch(message.func){

				case "fetchPendingRequests":
					console.log("inside moderator_queue fetchUsersToBeApproved");
					serviceowner.fetchPendingRequests(message,function(err,res){

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


				case "approveServiceRequest":
					console.log("inside moderator_queue approveServiceRequest");
					serviceowner.approveServiceRequest(message,function(err,res){

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


				case "rejectServiceRequest":
					console.log("inside moderator_queue rejectServiceRequest");
					serviceowner.rejectServiceRequest(message,function(err,res){

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

			};
		});
 	});




});
