var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bid = new Schema({

bid_id: String,
bid_date:Date,
property_id:String,
property : Object,
user : Object,
bid_value:Number,
bid_status:String,

});

module.exports = mongoose.model("bid",bid);