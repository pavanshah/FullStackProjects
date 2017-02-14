/**
 * New node file
 */

var mongo = require("./mongo");
var mongoURL = "mongodb://apps92:shim123@ds155727.mlab.com:55727/airbnbproto";
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Hosts = require('../Models/host');
var bodyParser = require('body-parser').json();
var uniqueIDGenerator = require('../routes/uniqueIDGenerator');
var bcrypt = require('bcryptjs');
var passport = require('passport');
require('./passport')(passport);
var LocalStrategy = require('passport-local').Strategy;


var authenticateHost = function (req,res,next){

	console.log("inside Passport signin register");

	passport.authenticate('host',function(err,user,info){
	if(err) {
      return next(err);
    }
    if(!user) {
      return res.redirect('/');
    }
    req.logIn(user, {session:false}, function(err) {
      if(err) {
        return next(err);
      }
      //console.log(user);
      //console.log("storing in session");
	 //console.log("Testing for user",res);
	 	req.session.emailId = user.email;
	 	//console.log(req.session.emailId);
		res.json({"HostLoggedIn":true});
		return;
		 //return res.redirect('/');;
	});
	
})(req, res, next);
};
//this function is to check if host is logged in or not.
//if not logged in signup/login modal will be displayed
//if user is logged in host profile will be shown.
var checkStarthosting = function(req,res){
	console.log("inside get host");
	//console.log(req.session.user.emailId);
	if(typeof req.session.user == "undefined"){
		console.log("setting the response");
		res.send({"response":400});
		return;
		
		//res.json({"result":"Host not logged in"});
		
	} else {
		res
		.status(200)
		.send({"result":"user logged in"});
		
	}
}

var HostSignUp = function(req,res){
	console.log("Inside signup host");
	console.log(req.body.hostSignUp);
	console.log("Testing input");
	console.log(req.body.hostSignUp.email);
	console.log("Testing output");
	
	Hosts.findOne({"email":req.body.hostSignUp.email},function(err,host){
		console.log("Inside find");
		if(err){
			console.log("inside find one error");
			res
			.status(422)
			.send({"result":"Invalid details"});
			return;
		}
		console.log(host);
		if(host != null){
			console.log("inside found one existing record");
			res
			.status(422)
			.send({"result":"Invalid details"});
			return;
		}
		req.body.hostSignUp.host_id = uniqueIDGenerator.returnUniqueID();
		req.body.hostSignUp.type = 2;
		var salt = bcrypt.genSaltSync(10);
		var hash = bcrypt.hashSync(req.body.hostSignUp.password, salt);
		req.body.hostSignUp.password = hash;
		
		var newHost = new Hosts(req.body.hostSignUp);
		newHost.save(function(err,result){
			console.log("Inside saving record");
			if(!err){
				console.log("Inside saved record ");
				console.log(result);
				
				res
				.status(200)
				.send({"result":"Host Registered"});
				return;
			}
			else
				console.log("Inside saving error ");
				console.log(err);
				res
				.status(422)
				.send({"result":"Invalid details"});
				return;
		});
		
	});
	

	
};
/*
var HostLogIn = function(req,res){
	console.log("Inside Host sign in");
	
	Hosts.findOne({"email":req.body.HostLogIn.email},function(err,host){
		if(err || host == null){
			console.log("user not found");
			res
			.status(404)
			.send({"result":"Host not found"});
			return;
		}
				

        var hash = host.password;
		console.log(hash);
        if(bcrypt.compareSync(req.body.HostLogIn.password, hash)){
        	console.log("successful login");
        	req.session.email = host.email;
        	req.session.username = host.firstname;

    		res
    		.status(200)
    		.send({"result":"Host Logged in"});
    		return;
        }

		res
		.status(404)
		.send({"result":"Host Not found"});
	})
	
	
	
};
*/
var DeleteHost = function(req,res){
	console.log("Inside Host Delete");
	
	Hosts.find({ "email":req.body.DeleteHost.email }).remove( function(err,removed){		
		console.log(removed);
		if(err || removed == null){
			res
			.status(400)
			.send({"result":"Best Request"});
			return;
		}
		
		res
		.status(200)
		.send({"result":"Host Deleted"});
	} );

};


var UpdateHost = function(req,res){
	console.log("Inside Host Update");
	
	req.body.UpdateHost.avgrating = 0;
	
	var query = {'email':req.body.UpdateHost.email};
	
	Hosts.findOneAndUpdate(query, req.body.UpdateHost, {upsert:false}, function(err, doc){
		
	    if (err) {
	    	res
			.status(400)
			.send({"result":"Bad request"});
			return;
	    }
	    

		res
		.status(200)
		.send({"result":"Host Updated"});
	});
	

	
};

var GetHost = function(req,res){
	console.log("Inside Get Host");
	
	
	Hosts.findOne({"email":req.query.email},function(err,host){
		if(err || host == null){
			res
			.status(404)
			.send({"result":"Host not found"});
			return;
			
		}
		res
		.status(200)
		.send({"result":host});
	});
	
}; 

exports.checkStarthosting = checkStarthosting;
exports.HostSignUp = HostSignUp;
exports.DeleteHost = DeleteHost;
exports.UpdateHost = UpdateHost;
exports.GetHost = GetHost;
exports.authenticateHost = authenticateHost;
