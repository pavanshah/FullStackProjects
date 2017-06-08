var amqp = require('amqp');
//var connection = amqp.createConnection({host:'127.0.0.1'});
//var rpc = new (require('../rpc/amqprpc'))(connection);
var uuid = require('uuid/v4');
var rpc = require('../rpc/client');

exports.getLoginPage = function(req,res){
	res.render('admin_login', {title: 'Login'});
}

exports.login = function(req,res) {

	/*var username = req.body.data.username;
	var password = req.body.data.password;*/

	var username = req.param("username");
    var password = req.param("password");

	if (username == 'admin' && password == 'admin') {
		//res.render('admin_dashboard');
		res.redirect('/admin_dashboard');
	} else {
		res.redirect('/admin');
	}

}

exports.admin_dashboard = function (req, res) {
    res.render('admin_dashboard');
};

exports.totalClusters = function (req, res) {
	var credentials = {"func" : "cluster_count"};

	var json_responses;
	console.log("In admin.js totalClusters before RabbitMQ");

	rpc.make_request('admin_queue',credentials, function(err,results){
		
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 200)
			{
				console.log("Total cluster count from Rabbit is: ", results.count);
				json_responses = {"statusCode" : 200, "data" : results.count};
				res.send(json_responses);
			}
			else 
			{    	
				json_responses = {"statusCode" : 401};
				res.send(json_responses);
			}
		}  
	});
}

exports.totalServices = function (req, res) {
	var credentials = {"func" : "service_count"};

	var json_responses;
	console.log("In admin.js totalServices before RabbitMQ");

	rpc.make_request('admin_queue',credentials, function(err,results){
		
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 200)
			{
				console.log("Total services count from Rabbit is: ", results.count);
				json_responses = {"statusCode" : 200, "data" : results.count};
				res.send(json_responses);
			}
			else 
			{    	
				json_responses = {"statusCode" : 401};
				res.send(json_responses);
			}
		}  
	});
}


exports.totalUsers = function (req, res) {
	var credentials = {"func" : "user_count"};

	var json_responses;
	console.log("In admin.js total users before RabbitMQ");

	rpc.make_request('admin_queue',credentials, function(err,results){
		
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 200)
			{
				json_responses = {"statusCode" : 200, "data" : results.count};
				res.send(json_responses);
			}
			else 
			{    	
				json_responses = {"statusCode" : 401};
				res.send(json_responses);
			}
		}  
	});
}


exports.topTenClusters = function (req, res) {
	var credentials = {"func" : "top_ten_clusters"};

	var json_responses;
	console.log("In admin.js top ten clusters before RabbitMQ");

	rpc.make_request('admin_queue',credentials, function(err,results){
		
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 200)
			{
				console.log("Total user count from Rabbit is: ", results.count);
				json_responses = {"statusCode" : 200, "data" : results.data};
				res.send(json_responses);
			}
			else 
			{    	
				json_responses = {"statusCode" : 401};
				res.send(json_responses);
			}
		}  
	});
}


exports.getAllClusters = function (req, res) {
	var credentials = {"func" : "get_all_clusters"};

	var json_responses;
	console.log("In admin.js get all clusters before RabbitMQ");

	rpc.make_request('admin_queue',credentials, function(err,results){
		
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 200)
			{
				json_responses = {"statusCode" : 200, "data" : results.data};
				res.send(json_responses);
			}
			else 
			{    	
				json_responses = {"statusCode" : 401};
				res.send(json_responses);
			}
		}  
	});
}


exports.getCluster = function (req, res) {

	var cluster_id = req.param("_id");
	var credentials = {"func" : "get_cluster", "_id" : cluster_id};

	var json_responses; 
	console.log("In admin.js get cluster before RabbitMQ: ", cluster_id);

	rpc.make_request('admin_queue',credentials, function(err,results){
		
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 200)
			{
				json_responses = {"statusCode" : 200, "data" : results.data};
				res.send(json_responses);
			}
			else 
			{    	
				json_responses = {"statusCode" : 401};
				res.send(json_responses);
			}
		}  
	});
}


exports.updateCluster = function (req, res) {

	var cluster_id = req.param("_id");
	var new_cluster_name = req.param("new_cluster_name");
	var new_services_added = req.param("new_services_added");
	var new_moderator = req.param("new_moderator");

	var temp = [];

	var new_services = temp.concat(new_services_added);

	var cluster_data = {
		"cluster_id":cluster_id,
		"cluster_name":new_cluster_name,
		"new_services":new_services,
		"new_moderator": new_moderator
	}


	var credentials = {"func" : "update_cluster", "data" : cluster_data};

	var json_responses; 
	console.log("In admin.js update cluster before RabbitMQ: ", cluster_id);

	rpc.make_request('admin_queue',credentials, function(err,results){
		
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 200)
			{
				json_responses = {"statusCode" : 200, "data" : results.data};
				res.send(json_responses);
			}
			else 
			{    	
				json_responses = {"statusCode" : 401};
				res.send(json_responses);
			}
		}  
	});
}

exports.getService = function (req, res) {

	var service_id = req.param("_id");
	var credentials = {"func" : "get_service", "_id" : service_id};

	var json_responses;
	console.log("In admin.js get service before RabbitMQ: ",service_id);

	rpc.make_request('admin_queue',credentials, function(err,results){
		
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 200)
			{
				json_responses = {"statusCode" : 200, "data" : results.data};
				res.send(json_responses);
			}
			else 
			{    	
				json_responses = {"statusCode" : 401};
				res.send(json_responses);
			}
		}  
	});
}

exports.removeService = function (req, res) {

	var service_id = req.param("_id");
	var credentials = {"func" : "remove_service", "_id" : service_id};

	var json_responses;
	console.log("In admin.js remove service before RabbitMQ: ",service_id);

	rpc.make_request('admin_queue',credentials, function(err,results){
		
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 200)
			{
				json_responses = {"statusCode" : 200, "data" : results.data};
				res.send(json_responses);
			}
			else 
			{    	
				json_responses = {"statusCode" : 401};
				res.send(json_responses);
			}
		}  
	});
}


exports.removeCluster = function (req, res) {

	var cluster_id = req.param("_id");
	var credentials = {"func" : "remove_cluster", "_id" : cluster_id};

	var json_responses;
	console.log("In admin.js remove service before RabbitMQ: ",cluster_id);

	rpc.make_request('admin_queue',credentials, function(err,results){
		
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 200)
			{
				json_responses = {"statusCode" : 200, "data" : results.data};
				res.send(json_responses);
			}
			else 
			{    	
				json_responses = {"statusCode" : 401};
				res.send(json_responses);
			}
		}  
	});
}

exports.updateService = function (req, res) {

	var service_id = req.param("_id");
	var new_service_name = req.param("new_service_name");
	var new_description = req.param("new_description");


	var service_data = {
		"service_id":service_id,
		"new_service_name":new_service_name,
		"new_description":new_description,
	}


	
	var credentials = {"func" : "update_service", "data" : service_data};

	var json_responses;
	console.log("In admin.js get service before RabbitMQ: ",service_id);

	rpc.make_request('admin_queue',credentials, function(err,results){
		
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 200)
			{
				json_responses = {"statusCode" : 200, "data" : results.data};
				res.send(json_responses);
			}
			else 
			{    	
				json_responses = {"statusCode" : 401};
				res.send(json_responses);
			}
		}  
	});
}


exports.createClusterAdmin = function(req,res){

	var cluster_id = uuid();
	var cluster_name = req.param("cluster_name");
	var moderator = req.param("moderator");
	var services = req.param("services");
	console.log("clustername: "+cluster_name);
	console.log("moderator: "+ moderator);
	console.log("Services from user in admin: ", services);
	var users = [];
	var temp = [];

	var availableServices = temp.concat(services);

	var cluster_data = {
		"cluster_id":cluster_id,
		"cluster_name":cluster_name,
		"users":users,
		"availableServices":availableServices,
		"moderator": moderator
	}

	msg_payload = {
		"func" : "create_new_cluster",
		"data" : cluster_data
	}

	rpc.make_request('admin_queue',msg_payload,function(err,response){

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


exports.createService = function(req,res){

	var res= {};

	var service_id = uuid();
	var service_name = req.param("service_name");
	var service_desc = req.param("service_desc");
	var service_owner = req.param("service_owner");
	var clusters = req.param("clusters");

	var temp = []
	var addToClusters = temp.concat(clusters);


	console.log("service_name: "+ service_name);
	console.log("service_desc: "+ service_desc);
	console.log("service_owner: "+ service_owner);
	console.log("clusters: "+ addToClusters);

	var service_data = {
		"service_id":service_id,
		"servicename":service_name,
		"owner" : service_owner,
		"description":service_desc,
		"clusters" : addToClusters
	}

	msg_payload = {
		"func" : "create_new_service",
		"data" : service_data
	}

	rpc.make_request("admin_queue",msg_payload,function(err,response){

		if(err){
			res.status(400);
			res.json({"data":"failed"});
			//res.send(res);
			res.render('admin_serviceMgmt');
		}
		else{
			if(response.status==200){
			res.status(200);
			res.json({"data":"success"});
			//res.send(res);
			res.render('admin_serviceMgmt');
		}
		}

	});


}


exports.getAllModerators = function (req, res) {
	var credentials = {"func" : "get_all_moderators"};

	var json_responses;
	console.log("In admin.js get all moderators before RabbitMQ");

	rpc.make_request('admin_queue',credentials, function(err,results){
		
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 200)
			{
				json_responses = {"statusCode" : 200, "data" : results.data};
				res.send(json_responses);
			}
			else 
			{    	
				json_responses = {"statusCode" : 401};
				res.send(json_responses);
			}
		}  
	});
}

exports.getAllServiceOwners = function (req, res) {
	var credentials = {"func" : "get_all_service_owners"};

	var json_responses;
	console.log("In admin.js get all service owners before RabbitMQ");

	rpc.make_request('admin_queue',credentials, function(err,results){
		
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 200)
			{
				json_responses = {"statusCode" : 200, "data" : results.data};
				res.send(json_responses);
			}
			else 
			{    	
				json_responses = {"statusCode" : 401};
				res.send(json_responses);
			}
		}  
	});
}


exports.getAllServices = function (req, res) {
	var credentials = {"func" : "get_all_services"};

	var json_responses;
	console.log("In admin.js get all services before RabbitMQ");

	rpc.make_request('admin_queue',credentials, function(err,results){
		
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 200)
			{
				json_responses = {"statusCode" : 200, "data" : results.data};
				res.send(json_responses);
			}
			else 
			{    	
				json_responses = {"statusCode" : 401};
				res.send(json_responses);
			}
		}  
	});
}



exports.admin_clusterMgmt = function (req,res) {
	res.render('admin_clusterMgmt');
}

exports.admin_createCluster = function (req,res) {
	res.render('admin_createCluster');
}


exports.admin_serviceMgmt = function (req,res) {
	res.render('admin_serviceMgmt');
}

exports.admin_createService = function (req,res) {
	res.render('admin_createService');
}

exports.logout = function (req,res) {
	res.redirect('/admin');
}


