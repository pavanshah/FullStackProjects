var mongo = require("./mongo");
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uuid = require('uuid/v4');
var Cluster = require('../Models/cluster');

var mq_client = require('../rpc/client');



exports.getListOfCluster = function(req,res){

	Cluster.find({},function(err, result){
		if(!err)
		{
			res.send({"status":200, "result":result});
		}
		else
		{
			res.send({"status":401});
		}
	})

}


exports.createCluster = function(req,res){

	var cluster_id = uuid();
	var cluster_name = req.body.data.cluster_name;
	var users = [];
	var availableServices = [];

	console.log("clustername:"+cluster_name);

	var cluster_data = {
		"cluster_id":cluster_id,
		"cluster_name":cluster_name,
		"users":users,
		"availableServices":availableServices
	}

	msg_payload = {
		"func" : "create_new_cluster",
		"data" : cluster_data
	}

	mq_client.make_request("cluster_queue",msg_payload,function(err,response){

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





exports.requestNewService = function(req,res){

	console.log(req.body.data.username);
res.status(200).send().end();
/*

	msg_payload = {
		"func" : "request_new_service",
		"user_id" : "1"
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
*/

}