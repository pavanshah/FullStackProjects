var mongo = require("./mongo");
var mongoURL = "mongodb://apps92:shim123@ds155727.mlab.com:55727/airbnbproto";
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Property = require('./Models/property');
var Bill = require('./Models/bill');
var Users = require('./Models/user');
var moment = require('moment');
var daterange = require('daterange');
var _ = require('underscore');


function GenerateBill(msg,callback){

	var newBill = Bill(msg.billObj);

	newBill.save(function(err,result){

			if(!err){
				console.log(result);
				//res.status(200);
				callback(null,{"status":200,"result":"Bill Generated","bill":result});
			}
			else
				{
					console.log(err);
					callback(null,{"status":400,"result":"Failed to Generate bill","bill":null});
			}
		});


}

exports.GenerateBill = GenerateBill;



