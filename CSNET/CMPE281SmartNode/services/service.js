var mongo = require("./mongo");
/*var mongoURL = "mongodb://apps92:shim123@ds155727.mlab.com:55727/airbnbproto";*/
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Users = require('./Models/user');
var moment = require('moment');
var Services = require('./Models/service');
var Clusters = require('./Models/cluster');

exports.requestNewService = function(msg,callback){


	//console.log("fetch user Services");
	console.log(msg);
	//var user_id = msg.user_id;



	var service_id = msg.service_id;
	var service_name = msg.service_name;
	var user_description = msg.user_description;
	var status = msg.status;

	var cartData = {
		"service_id":service_id,
		"service_name":service_name,
		"status":status,
		"user_description":user_description
	}


	  Users.update({"email":msg.email}, {$push: {service_cart : cartData}} ,function(err,data){
	    console.log("found"+data);
	   // console.log(trip);
	    if(!err){
	         
	    	callback(null,{"status":200,"result":"service requested"});
	          
	        }
	        else{
	          console.log("inside error");
	          console.log(err);
	          callback(err,null);
	        }  
	  });

}


exports.createService = function (msg, callback) {

	console.log("inside create service"+msg.data.servicename);

	var service_data = msg.data;

	service = Services(service_data);

	service.save(function(err, result) {
		if(err){
			  console.log("inside error");
	          console.log(err);
	          callback(err,null);
		}
		else
		{
			console.log("hereeeeeeeee");
			callback(null,{"status":200,"result":"Service created!"});
		}
	});
}


exports.fetchAvailableServices = function(msg, callback){

	console.log("fetch valid services");
	console.log(msg);



	  Users.findOne({"email":msg.user_email},function(err,user){
	    console.log("found"+user);
	   // console.log(trip);
	    if(!err){
	    	console.log("1111111");
	    	Clusters.findOne({"cluster_id":user.cluster}, function(err, clusterData){
	    		console.log("222"+clusterData);
	    		if(!err){
	    			console.log("3333");

	    			var services = clusterData.availableServices;
	    			/*var i=0
	    			for(i=0;i<services.length;i++)
	    			{

	    			}*/
	    			console.log("services:"+services);

	    			Services.find({"service_id":{$in: services}}, function(err,availableServices){
	    				if(!err){
	    					callback(null,{"status":200, "result": availableServices});
	    				}
	    			});

	    		}
	    		else
	    		{
	    			callback(err,null);
	    		}
	    	});



	         
	    	//callback(null,{"status":200,"trip":trip});
	          
	        }
	        else{
	          console.log("inside error");
	          console.log(err);
	          callback(err,null);
	        }  
	  });

}