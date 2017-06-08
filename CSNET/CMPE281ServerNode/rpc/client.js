var amqp = require('amqp');

//var connection = amqp.createConnection({host:'127.0.0.1'});
var connection = amqp.createConnection({url: "amqp://vansh:vansh@ec2-54-202-109-232.us-west-2.compute.amazonaws.com"});


connection.on('error', function(e) {
  console.log("Error from amqp: ", e);
});


var rpc = new (require('./amqprpc'))(connection);

//make request to rabbitmq
function make_request(queue_name, msg_payload, callback){
	rpc.makeRequest(queue_name, msg_payload, function(err, response){
		if(err)
			console.error(err);
		else{
			console.log("response", response);
			callback(null, response);
		}
	});
}

exports.make_request = make_request;
