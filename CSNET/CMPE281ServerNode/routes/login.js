var uuid = require('uuid/v4');
var mq_client = require('../rpc/client');


var mongo = require("./mongo");
var mongoose = require('mongoose');
var Users = require('../Models/user');



exports.logout = function(req,res){

	req.session.destroy();
	res.status(200);
	res.json({"data" : "Logout successful"});
	return
}


exports.signIn = function(req,res){

	var email = req.body.data.email;
	var password = req.body.data.password;

	var credentials = {"func" : "sign_in_service", "email" : email, "password" : password};

	mq_client.make_request('user_queue',credentials, function(err,results){
		
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 200)
			{
				console.log("Response received");
				req.session.email = req.body.data.email;

				res.status(200);
				res.json({"data" : results.data});
				return
			}
			else if(results.code==401){
				res.status(401);
				res.json({"data" : "Your account is pending approval from moderator"});
			}
			else if(results.code==400){
				res.status(401);
				res.json({"data" : "Sorry, Your account request is rejected by the moderator"});
			}
			else 
			{    	
				res.status(404);
				res.json({"data" : "Please enter valid Email id or Password"});
				return
			}
		}  
	});

}


exports.getUser = function(req,res){

	var user = req.session.email;

	Users.findOne({"email":user}, function(err, results){
		if(!err){
			res.send({"status":200, "result":results});
		}
		else
		{
			res.send({"status":400, "result":"user not found"});
		}
	});

}


exports.signUp = function(req,res){

	var firstname = req.body.data.firstname;
	var lastname = req.body.data.lastname;
	var gender = req.body.data.gender;
	var phone = req.body.data.phone;
	var email = req.body.data.email;
	var password = req.body.data.password;
	var cluster = req.body.data.cluster;
	var UserType = "Part";
	var service = [];


		var userJson = {
		"firstname":firstname,
		"lastname":lastname,
		"email":email,
		"password":password,
		"gender":gender,
		"phone":phone,
		"cluster":cluster,
		"UserType":UserType,
		"status":"inactive",
		//Message:Message,
		"Service":service,
		//service_cart:service_cart
		}
		console.log(userJson);
		//var userrr = Users(userJson);

	var credentials = {"func" : "sign_up_service", "data":userJson};

	var json_responses;

	mq_client.make_request('user_queue',credentials, function(err,results){
		
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 200)
			{
				console.log("signup successful");
				res.status(200);
				res.json({"data" : "signup successful"});
				return
			}
			else 
			{    	
				console.log("signup unsuccessful");
				res.status(400);
				res.json({"data" : "bad request"});
				return
			}
		}  
	});

}

