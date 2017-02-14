var mongo = require("./mongo");
var mongoURL = "mongodb://apps92:shim123@ds155727.mlab.com:55727/airbnbproto";



function handle_request(msg, callback){
	
	var res = {};
	console.log("In handle request:"+ msg.username);
	 
}

exports.handle_request = handle_request;