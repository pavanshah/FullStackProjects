var mongo = require("./mongo");
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Users = require('./Models/user');
var moment = require('moment');


function fetchPendingRequests(msg, callback){
	var cluster_id = msg.service_id;

	console.log("service_id "+cluster_id);

	Users.find({cluster : cluster_id}, function(err, result){
		if(!err){

				if(!result)
				{
					console.log("error "+err);
				}
				else
				{
					//console.log("result "+result);	
					var resultJson = [];

					for(var i = 0 ; i < result.length ; i++)
					{
						var cartlength = result[i].service_cart.length;
						
						//console.log("user "+result[i].firstname+" cartlength "+cartlength);

						for(var j = 0 ; j < cartlength ; j++)
						{

							if(result[i].service_cart[j].status === "PENDING")
							{
								var tempJson = {};
							//	console.log("user email "+result[i].email+" service_id "+result[i].service_cart[j]._id);
								tempJson.user_email = result[i].email;
								tempJson.username = result[i].firstname+" "+result[i].lastname;
								tempJson.service_cart = result[i].service_cart[j];
								resultJson.push(tempJson);
							}

						}
					}

					console.log("result "+resultJson);
					callback(null,{"code":200,"data":resultJson});

				}
			}
		
		else{
			console.log(err);
			callback(null,{"code":400,"data":err});
			}
	});



}



function approveServiceRequest(msg, callback)
{
	console.log("email "+msg.useremail);
	console.log("_id "+msg._id);


	Users.update({email : msg.useremail, service_cart : {$elemMatch: { _id : msg._id }}}, {$set : {"service_cart.$.status" : "COMPLETED"}} , function(err, result){

		if(result)
		{
			console.log("result "+result);
			for(var i = 0 ; i < result.length ; i++)
			console.log("data "+result[i]);
			callback(null,{"code":200,"data":"service approved"});	
		}
		else
		{
			console.log("error "+err);
		}

	});

}


function rejectServiceRequest(msg, callback)
{
	console.log("email "+msg.useremail);
	console.log("_id "+msg._id);


	Users.update({email : msg.useremail, service_cart : {$elemMatch: { _id : msg._id }}}, {$set : {"service_cart.$.status" : "REJECTED"}} , function(err, result){

		if(result)
		{
			console.log("result "+result);
			for(var i = 0 ; i < result.length ; i++)
			console.log("data "+result[i]);
			callback(null,{"code":200,"data":"service rejected"});
		}
		else
		{
			console.log("error "+err);
		}

	});

}


exports.approveServiceRequest = approveServiceRequest;
exports.rejectServiceRequest = rejectServiceRequest;
exports.fetchPendingRequests = fetchPendingRequests;