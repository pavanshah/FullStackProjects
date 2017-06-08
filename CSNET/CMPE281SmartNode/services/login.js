var mongo = require("./mongo");
var mongoose = require('mongoose');
var Users = require('./Models/user');


function signup_request(msg, callback){
	
	var res = {};
	console.log("In signup_request:"+ msg.data);
	console.log("email "+msg.data.email);

	
	Users.findOne({"email":msg.data.email},function(err,data){
	    if(!err){
	        
	        if(data == null)
	        {
	        	console.log("user doesn't exists");
	        }
	        else
	        {
	        	console.log("user exists");
	        	console.log("data received "+data.firstname);
				res.code = "400";
				callback(null, res);
	        }
	        
	          
	    }
	        else{
	          console.log("error");
	        }  
	  });
	
	
	var user = Users(msg.data);

    user.save(function(err,data)
	{
	    	if(!err){
	        console.log("data received "+data.firstname);
			res.code = "200";
			callback(null, res);
	          
	        }
	        else{
	          console.log("inside error");
	          console.log(err);
	          callback(err,null);
	        }  
	  });
	
}


function login_request(msg, callback){
	
	var res = {};
	console.log("in login_request:"+ msg.email);
	var username = msg.email;
	var password = msg.password;

	Users.findOne({"email":msg.email, "password":msg.password},function(err,data){
	    if(!err){
	        
	        if(data != null)
	        {
	        	console.log("data received "+data.firstname);
	        	if(data.status!="active"){
	        		
					res.code = "401";
					callback(null, res);
	        	}
	        	else{
	        		res.data = data;
					res.code = "200";
					callback(null, res);
	        	}
	    		
	        }
	        else
	        {
	        	res.code = "404";
				callback(null, res);
	        } 
	          
	      }
	        else{
	          console.log("inside error");
	          console.log(err);
	          callback(err,null);
	        }  
	  });
}

exports.login_request = login_request;
exports.signup_request = signup_request;