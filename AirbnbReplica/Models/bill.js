var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bill = new Schema({

billing_id: String,
billing_date:Date,
from_date:Date,
to_date:Date,
property : Object,
user : Object,
qty : Number,
trip_amount:Number,
bill_status:String
});

module.exports = mongoose.model("bill",bill);