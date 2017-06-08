var mongo = require("./mongo");
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uuid = require('uuid/v4');
var mq_client = require('../rpc/client');


exports.createNewService = function(req,res){

	var service_id = uuid();
	var servicename = req.body.data.servicename;
	var owner = req.body.data.owner;
	var description = req.body.data.description;

	var service_data = {
		"service_id":service_id,
		"servicename": servicename,
		"owner":owner,
		"description":description
	}

	msg_payload = {
		"func" : "create_new_service",
		"data": service_data
	}
	
	mq_client.make_request("service_queue",msg_payload,function(err,response){

		if(err){
			res.status(400);
			res.json({"result":"Bad Request"});
		}
		else{
			if(response.status==200){
			res.status(200);
			res.json({"result":response.result});
		}
		}

	});


}


exports.fetchAvailableServices = function(req,res){

var email = req.session.email;


	msg_payload = {
		"func" : "fetch_available_services",
		"user_email": email
	}
	
	mq_client.make_request("user_queue",msg_payload,function(err,response){

		if(err){
			res.status(400);
			res.json({"result":"Bad Request"});
		}
		else{
			if(response.status==200){
			res.status(200);
			res.json({"result":response.result});
		}
		}

	});


}



exports.requestService = function(req,res){

	var service_id = req.body.data.service_id;
	var service_name = req.body.data.service_name;
	var user_description = req.body.data.user_description;
	var status = "PENDING";

	//var email = "user1@gmail.com";
	var email = req.session.email;
	
	msg_payload = {
		"func":"request_new_service",
		"service_id":service_id,
		"service_name":service_name,
		"user_description":user_description,
		"status":status,
		"email":email
	}

	mq_client.make_request("user_queue",msg_payload,function(err,response){

		if(err){
			res.status(400);
			res.json({"result":"Bad Request"});
		}
		else{
			if(response.status==200){
			res.status(200);
			res.json({"result":response.result});
		}
		}

	});


}