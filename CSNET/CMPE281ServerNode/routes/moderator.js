var mongo = require("./mongo");
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uuid = require('uuid/v4');
var mq_client = require('../rpc/client');


exports.approveUser = function(req, res){

	var userEmail = req.body.data.email;
	var credentials = {"func" : "approveUser", "userEmail" : userEmail};

	console.log("sendgin user approval");

	mq_client.make_request('moderator_queue',credentials, function(err,results){
		
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


exports.rejectUser = function(req, res){
	
	var userEmail = req.body.data.email;
	var credentials = {"func" : "rejectUser", "userEmail" : userEmail};

	
	mq_client.make_request('moderator_queue',credentials, function(err,results){
		
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


exports.fetchUsersToBeApproved = function(req,res){

	var cluster = req.body.data.cluster;

	var credentials = {"func" : "fetchUsersToBeApproved", "cluster" : cluster};

	mq_client.make_request('moderator_queue',credentials, function(err,results){
		
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