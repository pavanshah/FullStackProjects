var mongo = require("./mongo");
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Users = require('./Models/user');
var moment = require('moment');


function approveUser(msg, callback){
	var userEmail = msg.userEmail;

	console.log("email "+userEmail);

	Users.update({"email":userEmail}, {$set : {status : "active"}}, function(err,result) {
      if (err) {
      	console.log("error "+err);
      }
      else
      {
      	console.log("success "+result);
      	callback(null,{"code":200,"data":"user accepted"});
      }

	});
}


function rejectUser(msg, callback){
	var userEmail = msg.userEmail;

	console.log("email "+userEmail);

	Users.update({"email":userEmail}, {$set : {status : "rejected"}}, function(err,result) {
      if (err) {
      	console.log("error "+err);
      }
      else
      {
      	console.log("success "+result);
      	callback(null,{"code":200,"data":"user rejected"});
      }

	});
}


function fetchUsersToBeApproved(msg,callback){
	var cluster = msg.cluster;

	console.log("rabbit cluster "+cluster);
	
	Users.find({"cluster":cluster}, function(err,result) {
		if(!err){

				if(result)
				{
					console.log("result "+result);

					var finalList = [];

					for(var i = 0 ; i < result.length ; i++)
					{
						if(result[i].UserType === "Part" && result[i].status === "inactive")
						{
							finalList.push(result[i]);
						}
					}

					console.log("finalList "+finalList);

					callback(null,{"code":200,"data":finalList});
				}
				else
				{
					callback(null,{"code":404,"data":"cluster not present"});	
				}
			}
		
		else{
			console.log(err);
			callback(null,{"code":400,"data":err});
			}
	});
}


exports.fetchUsersToBeApproved = fetchUsersToBeApproved;
exports.approveUser = approveUser;
exports.rejectUser = rejectUser;