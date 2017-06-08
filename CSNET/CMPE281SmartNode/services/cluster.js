var mongo = require("./mongo");
/*var mongoURL = "mongodb://apps92:shim123@ds155727.mlab.com:55727/airbnbproto";*/
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Users = require('./Models/user');
var moment = require('moment');
var Services = require('./Models/service');
var Clusters = require('./Models/cluster');

exports.createCluster = function(msg,callback){
	var cluster_data = msg.data;

	cluster = Clusters(cluster_data);

	cluster.save(function(err, result){
		if(err){
			  console.log("inside error");
	          console.log(err);
	          callback(err,null);
		}
		else
		{
			callback(null,{"status":200,"result":"Cluster created!"});
		}
	})
}

