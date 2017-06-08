var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Cluster = new Schema({
	cluster_id : String,
	cluster_name: String,
	users : [String],
	availableServices : [String]
});


module.exports = mongoose.model("Clusters",Cluster);