var mongo = require("./mongo");
var mongoURL = "mongodb://apps92:shim123@ds155727.mlab.com:55727/airbnbproto";
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bill = require('../Models/bill');
var trip = require('../Models/trip');
var uniqueIDGenerator = require('../routes/uniqueIDGenerator');
var mq_client = require('../rpc/client');
//var winston = require('winston');

var GenerateBill = function (req,callback){

	console.log("inside generate bill");
	
	req.body.bill.billing_id = uniqueIDGenerator.returnUniqueID();
	console.log("ID generated");
	
	var newBill = bill(req.body.bill);
	//console.log(newBill);

	msg_payload={
		"func":"GenerateBill",
		"billObj":newBill
	}

	mq_client.make_request("bill_queue",msg_payload,function(err,response){

		if(err){
			console.log("RabbitMQ bill Error");
		}
		else{
			console.log("RabbitMQ bill response");
			console.log(response);
		}

		if(response.status==200)
		{
			callback({"status":200,"result":"Bill Generated","bill":response.bill});
		}
		else
		{
			console.log(err);
			callback({"status":400,"result":"Failed to Generate bill","bill":null});
		}



	})

	/*newBill.save(function(err,result){

		if(!err){
			console.log(result);
			//res.status(200);
			callback({"status":200,"result":"Bill Generated","bill":result});
		}
		else
			{console.log(err);
			callback({"status":400,"result":"Failed to Generate bill"});
		}
	});*/
	
}

var SearchBillsByMonth = function (req,res){

	console.log("inside Bill by Month");

	var choosenMonth = req.body.month;
     
     var start = new Date(2016,choosenMonth-1,1);
     var end = new Date(2016,choosenMonth,1);

     bill.find({bill_status:"active",billing_date: { $gte: start,$lt:end}}, function (err, docs) {

     	if(!docs)
     	{
     		console.log(err);
     	}

     	else 
     		console.log(docs);
     	res.status(200);
     	res.json({"bills":docs});


     });

 }


var SearchBillsbyDate = function (req,res){

	console.log("inside bill by Date");

	bill.find({bill_status:"active",billing_date:req.body.date},function(err,docs){

		if(!docs)
		{
			console.log(err);
		}
		else
			console.log(docs);
		res.status(200);
		res.json({"bills":docs});

	})

}

var SearchHostBillsByMonth = function (req,res){

	console.log("inside Host Bill by Month");

	var choosenMonth = req.body.month;
     
     var start = new Date(2016,choosenMonth-1,1);
     var end = new Date(2016,choosenMonth,1);

     bill.find({'property.host_id':req.session.user.user_id,bill_status:"active",billing_date: { $gte: start,$lt:end}}, function (err, docs) {

     	if(!docs)
     	{
     		console.log(err);
     	}

     	else 
     		console.log(docs);
     	res.status(200);
     	res.json({"bills":docs});


     });

 }


var SearchHostBillsbyDate = function (req,res){

	console.log("inside Host bill by Date");
	console.log(req.session.user.user_id);
	bill.find({'property.host_id':req.session.user.user_id,bill_status:"active",billing_date:req.body.date},function(err,docs){

		if(!docs)
		{
			console.log(err);
		}
		else
			console.log(docs);
		res.status(200);
		res.json({"bills":docs});

	})

}

var SearchUserBillsByMonth = function (req,res){

	console.log("inside User Bill by Month");

	var choosenMonth = req.body.month;
     
     var start = new Date(2016,choosenMonth-1,1);
     var end = new Date(2016,choosenMonth,1);

     bill.find({'user.userid':req.session.user.user_id,bill_status:"active",billing_date: { $gte: start,$lt:end}}, function (err, docs) {

     	if(!docs)
     	{
     		console.log(err);
     	}

     	else 
     		console.log(docs);
     	res.status(200);
     	res.json({"bills":docs});


     });

 }


var SearchUserBillsbyDate = function (req,res){

	console.log("inside User bill by Date");
	console.log(req.session.user.user_id);
	bill.find({'user.userid':req.session.user.user_id,bill_status:"active",billing_date:req.body.date},function(err,docs){

		if(!docs)
		{
			console.log(err);
		}
		else
			console.log(docs);
		res.status(200);
		res.json({"bills":docs});

	})

}



var DeleteBill = function (req,res){

	console.log("inside delete bill");
	
	bill.update({"billing_id":req.body.bill.billing_id}, {$set : {bill_status : "inactive" }}, function(err, user){
		if (user) 
		{
			res.status(200);
			res.json({"result":"Bill Deleted"});
		} else 
		{
			console.log(err);
		}
	});
}

var tripObject = {};

var getBillByTripId = function(req,res) {
	//console.log("get bill by trip id"+req.body.trip_id+"...bill id..."+req.body.bill_id);
	console.log("sljbfjsdlb "+req.body.trip_id);
	//console.log("req.data.trip_id"+req.data.trip_id);

	//winston.remove(winston.transports.File);
	//winston.add(winston.transports.File, { filename: 'public/LogFiles/AirbnbAnalysis.json' });
	//winston.log('info', 'generate bill clicked', { page_name : 'bill_page', user_email : req.session.user.emailId, city : req.session.user.address.city, state : req.session.user.address.state, country : req.session.user.address.country});

	//winston.remove(winston.transports.File);
	//winston.add(winston.transports.File, { filename: 'public/LogFiles/UserTracking.json' });
	//req.session.user.user_tracker.push("bill_page");
	//winston.log('info', 'user tracker updated', {session_id : req.session.user.session_id, user_email : req.session.user.emailId, "user_tracker" : req.session.user.user_tracker});

	//var tripObj = trip.findOne();


	trip.find({"trip_id":req.body.trip_id},function(err,trip) {
		if(err)
		{
			res.status(401).json({"result":"unable to fetch trip object"});
		}
		else
		{
			tripObject = trip;
			console.log("sfbkhsbkhbhkwbfcdc"+trip[0]);
			console.log("abhjadbf"+trip[0].bill.billing_id);
			var query = {"billing_id":trip[0].bill.billing_id};
			var tripObj = bill.findOne(query);
			tripObj.exec(function(err,billObject) {
				if(err)
				{
					res.status(401).json({"result":"unable to fetch bill from trip id"});
				}
				else
				{
					//billObject.trip_start_date = tripObject.trip_start_date;
					//billObject.trip_end_date = tripObject.trip_end_date;
					console.log("billlll"+billObject);
					res.status(200).json({"result":"fetched bill from trip id", "bill":billObject});
				}
			});
			
			
/*			bill.find({"billing_id":tripObject.bill.billing_id},function(err,billObject) {
				if(err)
				{
					res.status(401).json({"result":"unable to fetch bill from trip id"});
				}
				else
				{
					billObject.trip_start_date = tripObject.trip_start_date;
					billObject.trip_end_date = tripObject.trip_end_date;
					console.log("billlll"+billObject);
					res.status(200).json({"result":"fetched bill from trip id", "bill":billObject});
				}
			});*/
		}
	});

}



exports.DeleteBill = DeleteBill;
exports.SearchBillsByMonth = SearchBillsByMonth;
exports.GenerateBill = GenerateBill;
exports.SearchBillsbyDate = SearchBillsbyDate;
exports.SearchHostBillsbyDate = SearchHostBillsbyDate;
exports.SearchHostBillsByMonth = SearchHostBillsByMonth
exports.SearchUserBillsbyDate = SearchUserBillsbyDate;
exports.SearchUserBillsByMonth = SearchUserBillsByMonth;
exports.getBillByTripId = getBillByTripId;