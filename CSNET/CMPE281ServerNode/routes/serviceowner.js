var mongo = require("./mongo");
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uuid = require('uuid/v4');
var mq_client = require('../rpc/client');


exports.approveServiceRequest = function(req, res){

	var useremail = req.body.data.email;
	var _id = req.body.data._id;

	var credentials = {"func" : "approveServiceRequest", "useremail" : useremail, "_id" : _id};

	mq_client.make_request('serviceowner_queue',credentials, function(err,results){
		
		if(err){
			console.log("err");
		}
		else 
		{
			console.log("success");
			if(results.code == 200)
			{
				console.log("Data received "+results.data);
				res.status(200);
				res.json({"data" : results.data });
				return
			}
		}  
	});
	
}


exports.rejectServiceRequest = function(req, res){
	
	var useremail = req.body.data.email;
	var _id = req.body.data._id;

	var credentials = {"func" : "rejectServiceRequest", "useremail" : useremail, "_id" : _id};

	mq_client.make_request('serviceowner_queue',credentials, function(err,results){
		
		if(err){
			console.log("err");
		}
		else 
		{
			console.log("success");
			if(results.code == 200)
			{
				console.log("Data received "+results.data);
				res.status(200);
				res.json({"data" : results.data });
				return
			}
		}  
	});	


}


exports.fetchPendingRequests = function(req,res){

	var service_id = req.body.data.service_id;

	var credentials = {"func" : "fetchPendingRequests", "service_id" : service_id};

	mq_client.make_request('serviceowner_queue',credentials, function(err,results){
		
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 200)
			{
				console.log("Data received "+results.data);
				res.status(200);
				res.json({"data" : results.data });
				return
			}
			else if(results.code == 404)
			{    	
				res.status(404);
				res.json({"error" : "No cluster found" });
				return
			}
			else
			{
				res.status(400);
				res.json({"error" : results.data });
				return
			}
		}  
	});

}