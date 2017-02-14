var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Property = new Schema({
 property_id: String,
 host_id: String,
 host:Object,
 category:String,
 qty:Number,
 base_price:Number,
 ListingType:String,
 ListingDate:Date,
 location: {
 				type:[Number],
 				required:true
 				
 			},
address : {
	street: String,
	state: String,
	city:String,
	zipcode:String,
	country:String,
	formatted:String
			 },

 description:String,
 propertyTitle:String,
 createdAt:Date,
 bookings:[{
 			start_date:Date,
 			end_date:Date,
 			user_email:String
 		}],
 bids:[{
 	bid_date:Date,
 	user_email:String,
 	bid_value:Number,
 	status:String

 }],
 property_start_date:Date,
 property_end_date:Date,
princing_catalog : {

	weekend_surge:Number,
	seasonal_surge:Number,
	weekly_discount:Number,
	monthly_discount:Number
					 },
propertyPictures: [String], 
propertyVideos:[String]

});

Property.pre('save', function(next){
   now = new Date();
   if (!this.createdAt) {
       this.createdAt = now;
   }
   next();
});

Property.index({location: '2dsphere'});
module.exports = mongoose.model("Property",Property);