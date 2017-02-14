var bodyParser = require('body-parser').json();
var mysqlPool = require("./mysql").pool;
var mongo = require("./mongo");
var mongoURL = "mongodb://apps92:shim123@ds155727.mlab.com:55727/airbnbproto";
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Users = require('../Models/user');
var Trips = require('../Models/trip');
var Bills = require('../Models/bill');
var mongodb = require('mongodb');
var redis = require('redis');
var client = redis.createClient();

function getRedisStatus(){
	return 1;
}

var getBillDetailAdmin = function(req,res){
	console.log("Inside bill ");
	
	
	client.exists('billdetail'+req.query.id, function(err, reply) {
		console.log("Redis query returned with value:");
		console.log(reply);
		
		if (reply === 1 && getRedisStatus()) {
	        console.log('redis cache exists');
	        client.hgetall('billdetail'+req.query.id, function(err, object) {
	        	console.log("Returned object is ");
	        	console.log(typeof object);
	            //console.log(object);
	            
	            res
    			.status(200)
    			.send({"result":JSON.parse(object.result),"start":object.start,"end":object.end});
	        });
	        
	    } else {		    	
	    	//var o_id = new mongodb.ObjectID(req.query.id);
	    	
	    	/*Users.find({"_id":o_id},function(err,user){
	    		
	    		client.hmset('profile'+req.query.id, {"result":JSON.stringify(user)});
    	        client.expire('profile'+req.query.id, 300);
	    		
    	        res
	    		.status(200)
	    		.send({"result":user});
	    		
	    	})*/
	    	
	    	var o_id = new mongodb.ObjectID(req.query.id);
	
			Bills.find({"_id":o_id},function(err,bill){
				console.log("test........");
				if(err || bill.length==0){
					res
					.status(200)
					.send({"result":"failed"});
					return;
				}
				console.log(bill[0].billing_id);
				
				Trips.find({"bill.billing_id":bill[0].billing_id},function(err,trip){
					console.log("Got tripppppppppp");
					//console.log(trip);
					
					if(trip.length == 0){
						
						res
						.status(200)
						.send({"result":bill});
						return;
					}

					var dateObjStart = new Date(trip[0].trip_start_date);
					var dateObjEnd = new Date(trip[0].trip_end_date);
					var monthStart = dateObjStart.getUTCMonth() + 1; //months from 1-12
					var dayStart = dateObjStart.getUTCDate();
					var yearStart = dateObjStart.getUTCFullYear();
					var monthEnd = dateObjEnd.getUTCMonth() + 1; //months from 1-12
					var dayEnd = dateObjEnd.getUTCDate();
					var yearEnd = dateObjEnd.getUTCFullYear();
					
					client.hmset('billdetail'+req.query.id, {"result":JSON.stringify(bill),"start":monthStart+'/'+dayStart+'/'+yearStart,"end":monthEnd+'/'+dayEnd+'/'+yearEnd});
	    	        client.expire('billdetail'+req.query.id, 300);
					res
					.status(200)
					.send({"result":bill,"start":monthStart+'/'+dayStart+'/'+yearStart,"end":monthEnd+'/'+dayEnd+'/'+yearEnd});
					
				});
					
				
				
				/*client.hmset('billdetail'+req.query.id, {"result":JSON.stringify(bill)});
    	        client.expire('billdetail'+req.query.id, 300);
				res
				.status(200)
				.send({"result":bill});*/			
			})
	    	
	    }
	    });

	
/*var o_id = new mongodb.ObjectID(req.query.id);
	
	Bills.find({"_id":o_id},function(err,bill){
		res
		.status(200)
		.send({"result":bill});			
	})*/
	
}

var deleteUser = function(req,res){
	console.log("Inside delete user");
	console.log(req.body);
	var o_id = new mongodb.ObjectID(req.body.id);
	
	Users.remove({"_id":o_id},function(err,user){
		if(err){
			res
			.status(200)
			.send({"result":"failed"});
			return;
		}
		res
		.status(200)
		.send({"result":"success"});
		
	})
	
	
}
var authorizeUser = function(req,res){
	console.log("Inside auth user");
	console.log(req.body);
	var o_id = new mongodb.ObjectID(req.body.id);
	
	Users.update({"_id":o_id}, { user_status: 'active' },  function(err,user){
		if(err){
			res
			.status(200)
			.send({"result":"failed"});
			return;
		}
		res
		.status(200)
		.send({"result":"success"});
	})
	
};

var getProfileForAdmin = function(req,res){
	console.log(req.query.id);


	
	
	client.exists('profile'+req.query.id, function(err, reply) {
		console.log("Redis query returned with value:");
		console.log(reply);
		
		if (reply === 1 && getRedisStatus()) {
	        console.log('redis cache exists');
	        client.hgetall('profile'+req.query.id, function(err, object) {
	        	console.log("Returned object is ");
	        	console.log(typeof object);
	            //console.log(object);
	            
	            res
    			.status(200)
    			.send({"result":JSON.parse(object.result)});
	        });
	        
	    } else {		    	
	    	var o_id = new mongodb.ObjectID(req.query.id);
	    	
	    	Users.find({"_id":o_id},function(err,user){
	    		
	    		client.hmset('profile'+req.query.id, {"result":JSON.stringify(user)});
    	        client.expire('profile'+req.query.id, 300);
	    		
    	        res
	    		.status(200)
	    		.send({"result":user});
	    		
	    	})
	    	
	    }
	    });
	
}

var getBillForAdmin = function(req,res){
	
	if(req.query.query == "new"){
		console.log("Inside new");
		
		client.exists('billnew', function(err, reply) {
			console.log("Redis query returned with value:");
			console.log(reply);
			
			if (reply === 1 && getRedisStatus()) {
		        console.log('redis cache exists');
		        client.hgetall('billnew', function(err, object) {
		        	console.log("Returned object is ");
		        	console.log(typeof object);
		           // console.log(object);
		            
		            res
	    			.status(200)
	    			.send({"result":JSON.parse(object.result)});
		        });
		        
		    } else {		    	
				
				Bills.find({},function(err,bills){
					//console.log(bills);
					client.hmset('billnew', {"result":JSON.stringify(bills)});
        	        client.expire('billnew', 300);
			
					res
					.status(200)
					.send({"result":bills});
				})
		    }
		    });
		
	/*Bills.find({},function(err,bills){
		console.log(bills);
		

		res
		.status(200)
		.send({"result":bills});
	})*/
	
	
	}
	else{
		console.log("Inside elseeeeeeee");

		
		
			//console.log(req.query.querytype);
			//console.log(req.query.date);
			//console.log(req.query.month);
			
	if(req.query.month != ""){
		console.log("Inside month query");
		Bills.aggregate([{$project: {billing_date: 1,_id:1,billing_id:1,property:1,trip_amount:1, month: {$month: '$billing_date'}}},
				  {$match: {month: Number(req.query.month)}}],function(err,bills){
			//console.log(bills);
			

			res
			.status(200)
			.send({"result":bills});
		})
				  
				  
	}		
	else{
		console.log("Inside date query");
		
		var dateObj = new Date(req.query.date);
		var month = dateObj.getUTCMonth() + 1; //months from 1-12
		var day = dateObj.getUTCDate();
		var year = dateObj.getUTCFullYear();
		
		Bills.aggregate([{$project: {billing_date: 1,from_date: 1,billing_id:1,property:1,trip_amount:1, 
		    month: {$month: '$billing_date'},
		    dayOfMonth: {$dayOfMonth: '$billing_date'},
		    year: {$year: '$billing_date'}}},
		    {$match: {month: month,dayOfMonth: day,year: year}}],function(err,bills){
			//console.log(bills);
			

			res
			.status(200)
			.send({"result":bills});
		})
	}
			
		
		
	}
	
}
var getHostsForAdmin = function(req,res){

	console.log(req.query);
	console.log("inside getHostsForAdmin");
	
	if(req.query.query == "new"){
		console.log("Inside new");
		
		
		client.exists('hostnew', function(err, reply) {
			console.log("Redis query returned with value:");
			//console.log(reply);
			
			if (reply === 1 && getRedisStatus()) {
		        console.log('redis cache exists');
		        client.hgetall('hostnew', function(err, object) {
		        	console.log("Returned object is ");
		        	console.log(typeof object);
		            //console.log(object);
		            
		            res
	    			.status(200)
	    			.send({"result":JSON.parse(object.result)});
		        });
		        
		    } else {
		    	Users.find({"UserType":"Host"},function(err,user){
					//console.log(user);
					
					client.hmset('hostnew', {"result":JSON.stringify(user)});
        	        client.expire('hostnew', 300);
					res
					.status(200)
					.send({"result":user});
				})
		    }
		    });
	/*	Users.find({},function(err,user){
			console.log(user);
			
	
			res
			.status(200)
			.send({"result":user});
		})*/
	}
	else{
		var searchObject = {};
		
		/*if(req.query.type != "" && req.query.address != ""){
			//searchObject = {"UserType":req.query.type,"address.city":req.query.address.toLowerCase()};
			searchObject = {"UserType":req.query.type,"address.city":{ $regex : new RegExp(req.query.address, "i") }};
		}
		else if(req.query.address != ""){
			//searchObject = {"address.city":req.query.address.toLowerCase()};
			searchObject = {"address.city":{ $regex : new RegExp(req.query.address, "i") }};
			
		}
		else if(req.query.type != ""){
			searchObject = {"UserType":req.query.type}; 
		}*/
		
		if(req.query.status != "" && req.query.address != ""){
			//searchObject = {"UserType":req.query.type,"address.city":req.query.address.toLowerCase()};
			searchObject = {"UserType":"Host","user_status":req.query.status,"address.city":{ $regex : new RegExp(req.query.address, "i") }};
		}
		else if(req.query.address != ""){
			//searchObject = {"address.city":req.query.address.toLowerCase()};
			searchObject = {"UserType":"Host","address.city":{ $regex : new RegExp(req.query.address, "i") }};
			
		}
		else if(req.query.status != ""){
			searchObject = {"UserType":"Host","user_status":req.query.status}; 
		}
		
		//if(req.query.type != "" && req.query.address != ""){
		console.log("-------------------------------------------------------------------");
		console.log(searchObject);
		
		//redis changes starts
		client.exists('hostquery'+JSON.stringify(searchObject), function(err, reply) {
			console.log("Redis query returned with value:");
			console.log(reply);
			
			if (reply === 1 && getRedisStatus()) {
		        console.log('redis cache exists');
		        client.hgetall('hostquery'+JSON.stringify(searchObject), function(err, object) {
		        	console.log("Returned object is ");
		        	console.log(typeof object);
		            //console.log(object);
		            
		            res
	    			.status(200)
	    			.send({"result":JSON.parse(object.result)});
		        });
		        
		    } else {
		    	Users.find(searchObject,function(err,user){
					//console.log(user);
					
					client.hmset('hostquery'+JSON.stringify(searchObject), {"result":JSON.stringify(user)});
        	        client.expire('hostquery'+JSON.stringify(searchObject), 300);
					res
					.status(200)
					.send({"result":user});
				})
		    }
		    });
		//redis changes ends
		
		
		
	/*	Users.find(searchObject,function(err,user){
			console.log(user);
	
			res
			.status(200)
			.send({"result":user});
		})*/
		
		//}
	}
	
}

var getPropertyPerYear = function(req,res){
	console.log("inside get property per year");
	console.log(req.query);
	
	client.exists('property'+req.query.year, function(err, reply) {
		console.log("Redis query returned with value:");
		console.log(reply);
		
		if (reply === 1 && getRedisStatus()) {
	        console.log('redis cache exists');
	        client.hgetall('property'+req.query.year, function(err, object) {
	        	console.log("Returned object is ");
	        	console.log(typeof object);
	            //console.log(object);
	            
	            res
    			.status(200)
    			.send({"result":JSON.parse(object.result)});
	        });
	        
	    } else {
	    	mysqlPool.getConnection(function(err, connection) {
	    		if(err){
	    			console.log("failed to connec in error");
	    			console.log(err);

	    			res
	    			.status(200)
	    			.send({"result":"failed"});
	    			return;
	    		}
	    		
	    		var sqlBarChart = "select property_name as label,sum(total_cost) value from billinglogs where date = "+req.query.year +" group by property_name limit 10";
	            connection.query(sqlBarChart,function(err,barResults){
	            	
	            	var barResultsJson = JSON.stringify(barResults);
	                var barResultOutput = JSON.parse(barResultsJson);
	                connection.release();
	                
	                client.hmset('property'+req.query.year, {"result":JSON.stringify(barResultOutput)});
        	        client.expire('property'+req.query.year, 300);
	                res
	    			.status(200)
	    			.send({"result":barResultOutput});
	    			return;
	            });
	    		
	    	})
	    }
	    });
	
/*	mysqlPool.getConnection(function(err, connection) {
		if(err){
			console.log("failed to connec in error");
			console.log(err);

			res
			.status(200)
			.send({"result":"failed"});
			return;
		}
		
		var sqlBarChart = "select property_name as label,sum(total_cost) value from billinglogs where date = "+req.query.year +" group by property_name limit 10";
        connection.query(sqlBarChart,function(err,barResults){
        	
        	var barResultsJson = JSON.stringify(barResults);
            var barResultOutput = JSON.parse(barResultsJson);
            connection.release();
            res
			.status(200)
			.send({"result":barResultOutput});
			return;
        });
		
	})*/
	
}
var getMainDashboard = function(req,res){
	console.log("I am here to get dashboard details");
	req.session.admin = "loggedin";
	if(typeof req.session.admin === "undefined"){
		res
		.status(200)
		.send({"result":"login"});
		return;
	}
	
	console.log("Gonna check for redis cache");
	client.exists('mainDash', function(err, reply) {
		console.log("Redis query returned with value:");
		console.log(reply);
		
	    if (reply === 1 && getRedisStatus()) {
	        console.log('redis cache exists main');
	        client.hgetall('mainDash', function(err, object) {
	        	console.log("Returned object is ");
	        	console.log(typeof object);
	            //console.log(object);
	            //console.log("------------");
	            //console.log({"result":JSON.parse(object.result),"barchart":JSON.parse(object.barchart),"linechart":JSON.parse(object.linechart),"userstatus":JSON.parse(object.userstatus),"userstype":JSON.parse(object.userstype)});
	            
	            res
    			.status(200)
    			.send({"result":JSON.parse(object.result),"barchart":JSON.parse(object.barchart),"linechart":JSON.parse(object.linechart),"userstatus":JSON.parse(object.userstatus),"userstype":JSON.parse(object.userstype)});
	        });
	        
	    } else {
	        console.log('redis doesn\'t exist main');
	        
	        
	        
	        mysqlPool.getConnection(function(err, connection) {
	    		sql = "select host_name,sum(total_cost) cost from billinglogs group by host_name order by cost desc limit 10";
	    		if(err){
	    			console.log("failed to connec in error");
	    			console.log(err);
	    			
	    		}
	    		else{
	    		console.log("connection succesful");
	    		//console.log(connection);
	    		connection.query(sql,function(err,results){
	    			//console.log(results);
	    			var result = JSON.stringify(results);
	                var resultData = JSON.parse(result);		  
	                //console.log(resultData);
	    			//connection.release();
	                
	                
	                var sqlBarChart = "select property_name as label,sum(total_cost) value from billinglogs where date = '2016' group by property_name limit 10";
	                connection.query(sqlBarChart,function(err,barResults){
	                	
	                	var barResultsJson = JSON.stringify(barResults);
	                    var barResultOutput = JSON.parse(barResultsJson);
	                    
	                    
	                    var sqllineChart = "select city,date,sum(total_cost) value from billinglogs group by city,date";
	                    connection.query(sqllineChart,function(err,lineResults){
	                    
	                    	var lineResultsJson = JSON.stringify(lineResults);
	                        var lineResultOutput = JSON.parse(lineResultsJson);
	                    
	                        console.log("Inside................. line")
	                    	//console.log(resultData);
	                        //console.log(barResultOutput);
	                   //     console.log(lineResultOutput);
	                        var lineOutput = [];
	                        for(var i=0;i<lineResultOutput.length;i++){
	                        	//console.log(lineResultOutput[i].city);
	                        	var found = 0;
	                        		for(var j=0;j<lineOutput.length;j++){
	                        			if(lineOutput[j].key == lineResultOutput[i].city){
	                        				lineOutput[j].values.push([Number(lineResultOutput[i].date),lineResultOutput[i].value]);
	                        				found = 1;
	                        				break;
	                        			}
	                        		}                 
	                        		
	                        		if(found == 0){
	                        			lineOutput.push({key:lineResultOutput[i].city,values:[[2014,0],[Number(lineResultOutput[i].date),lineResultOutput[i].value]]});
	                        		}
	                        }
	                        
	                        /*for(var k=0;k<lineOutput.length;k++){
	                        	console.log(lineOutput[k].key);
	                        	console.log(lineOutput[k].values);
	                        }*/
	                        
	                        Users.aggregate([{$match: {"UserType":"Host"}},{$group: {_id: '$user_status',count: {$sum: 1}}}], function (err, status) {
	                                       if (err) {
	                                    	   console.log("User host................failed.........");
	                                    	   return;
	                                       } else {
	                                           //success case
	                                    	   
	                                    	console.log("User host................");
	                     //               	console.log(status);
	                                    	   
	                                    	var userstatus = [];
	                                    	
	                                    	for(var i=0;i<status.length;i++){
	                                    		if(status[i]._id == "inactive"){
	                                    			userstatus.push({'key':"Pending",'y':status[i].count});
	                                    		}
	                                    		else if(status[i]._id == "active"){
	                                    			userstatus.push({'key':"Approved",'y':status[i].count});
	                                    		}
	                                    	}
	                                    	
	                                    	console.log(userstatus);
	                                    	Users.aggregate([{$group: {_id: '$UserType',count: {$sum: 1}}}], function (err, usertype) {
	 	                                       if (err) {
	 	                                    	   console.log("User type................failed.........");
	 	                                    	   return;
	 	                                       } else {
	 	                                    	  console.log("User type................");
	 	                   //                 	   console.log(usertype);
	 	                                    
	 	                                    	 /* [
	 	                      	                {
	 	                      	                    key: "Users",
	 	                      	                    y: 100
	 	                      	                },
	 	                      	                {
	 	                      	                    key: "Hosts",
	 	                      	                    y: 26
	 	                      	                }
	 	                      	                ]*/
	 	                                    	  var usertypeval = [];
	 		                                    	
	 		                                    	for(var i=0;i<usertype.length;i++){
	 		                                    		if(usertype[i]._id == "User"){
	 		                                    			usertypeval.push({'key':"Users",'y':usertype[i].count});
	 		                                    		}
	 		                                    		else if(usertype[i]._id == "Host"){
	 		                                    			usertypeval.push({'key':"Hosts",'y':usertype[i].count});
	 		                                    		}
	 		                                    	}
	 		                                    	
	 		                                    	//console.log(usertypeval);
	 	                                    	  client.hmset('mainDash', {"result":JSON.stringify(resultData),"barchart":JSON.stringify(barResultOutput),"linechart":JSON.stringify(lineOutput),"userstatus":JSON.stringify(userstatus),"userstype":JSON.stringify(usertypeval)});
	 		               	            	        client.expire('mainDash', 300);
	 		               	                        
	 		               	            	        console.log("+++++++++++++++++++++++++++++");
	 		               	            	        console.log({"result":resultData,"barchart":barResultOutput,"linechart":lineOutput,"userstatus":userstatus,"userstype":usertypeval});
	 		               	            	    connection.release();
	 		               	                        res
	 		               	            			.status(200)
	 		               	            			.send({"result":resultData,"barchart":barResultOutput,"linechart":lineOutput,"userstatus":userstatus,"userstype":usertypeval});
	 	                                    	   
	 	                                       }});
	 	                        
	                                    	
	                                    	
	                                    	
	                                    	   
	                                       }
	                                   });
	                        
	                        //console.log(lineOutput);
	                        //new changes
	                        /*client.hmset('mainDash', {"result":JSON.stringify(resultData),"barchart":JSON.stringify(barResultOutput),"linechart":JSON.stringify(lineOutput)});
	            	        client.expire('mainDash', 300);
	                        
	                        res
	            			.status(200)
	            			.send({"result":resultData,"barchart":barResultOutput,"linechart":lineOutput});*/
	                      //new changes
	                    });
	                    
	                	
	                })
	    			
	    		});
	    			
	    		
	    	}
	    	})

	        
	       //answer = {"result":{"resultData":"resultval"},"barchart":{"barkey":"barval"},"linechart":{"linekey":"lineval"}}
	        //client.hmset('main1', answer);
	        //client.expire('main1', 100);
	    }
	});
	
	/*mysqlPool.getConnection(function(err, connection) {
		sql = "select host_name,sum(total_cost) cost from billinglogs group by host_name order by cost desc limit 10";
		if(err){
			console.log("failed to connec in error");
			console.log(err);
			
		}
		else{
		console.log("connection succesful");
		//console.log(connection);
		connection.query(sql,function(err,results){
			//console.log(results);
			var result = JSON.stringify(results);
            var resultData = JSON.parse(result);		  
            //console.log(resultData);
			//connection.release();
            
            
            var sqlBarChart = "select property_name as label,sum(total_cost) value from billinglogs where date = '2016' group by property_name limit 10";
            connection.query(sqlBarChart,function(err,barResults){
            	
            	var barResultsJson = JSON.stringify(barResults);
                var barResultOutput = JSON.parse(barResultsJson);
                
                
                var sqllineChart = "select city,date,sum(total_cost) value from billinglogs group by city,date";
                connection.query(sqllineChart,function(err,lineResults){
                
                	var lineResultsJson = JSON.stringify(lineResults);
                    var lineResultOutput = JSON.parse(lineResultsJson);
                
                    console.log("Inside................. line")
                	//console.log(resultData);
                    //console.log(barResultOutput);
                    console.log(lineResultOutput);
                    var lineOutput = [];
                    for(var i=0;i<lineResultOutput.length;i++){
                    	//console.log(lineResultOutput[i].city);
                    	var found = 0;
                    		for(var j=0;j<lineOutput.length;j++){
                    			if(lineOutput[j].key == lineResultOutput[i].city){
                    				lineOutput[j].values.push([Number(lineResultOutput[i].date),lineResultOutput[i].value]);
                    				found = 1;
                    				break;
                    			}
                    		}                 
                    		
                    		if(found == 0){
                    			lineOutput.push({key:lineResultOutput[i].city,values:[[2014,0],[Number(lineResultOutput[i].date),lineResultOutput[i].value]]});
                    		}
                    }
                    
                    for(var k=0;k<lineOutput.length;k++){
                    	console.log(lineOutput[k].key);
                    	console.log(lineOutput[k].values);
                    }
                    
                    //console.log(lineOutput);
                    res
        			.status(200)
        			.send({"result":resultData,"barchart":barResultOutput,"linechart":lineOutput});
                });
                
            	
            })
			
		});
			
		
	}
	})
*/
}

exports.getMainDashboard = getMainDashboard;
exports.getPropertyPerYear = getPropertyPerYear;
exports.getHostsForAdmin = getHostsForAdmin;
exports.getBillForAdmin =getBillForAdmin;
exports.getProfileForAdmin = getProfileForAdmin;
exports.authorizeUser = authorizeUser;
exports.deleteUser = deleteUser;
exports.getBillDetailAdmin = getBillDetailAdmin;
