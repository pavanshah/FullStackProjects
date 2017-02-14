var mongo = require("./mongo");
var mongoURL = "mongodb://apps92:shim123@ds155727.mlab.com:55727/airbnbproto";
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Property = require('./Models/property');
var Users = require('./Models/user');
var moment = require('moment');
var daterange = require('daterange');
var _ = require('underscore');
var Bid = require('./Models/bid');

function filter(properties,start_date,end_date) {
    //var userProvidedRange = daterange.create(new Date(2017,3,2),new Date(2017,3,11));
    var filteredProperties = [];
    //console.log("start date",start_date);
    //console.log("end_date",end_date);
    var userProvidedRange = daterange.create(new Date(start_date),new Date(end_date));
    _.each(properties,function(property){
      //console.log(property);
      if(!property.bookings || property.bookings.length==0){
        filteredProperties.push(property);
      }

      if(property.bookings && property.bookings.length >  0){
        var bookings  = property.bookings;
        var isBooked = false;
        _.each(property.bookings,function(booking){
           isBooked = false;
          var bookingRange = daterange.create(new Date(booking.start_date),new Date(booking.end_date));

          if(daterange.equals(userProvidedRange,bookingRange) || daterange.contains(userProvidedRange,bookingRange) || daterange.contains(bookingRange,userProvidedRange) || daterange.overlaps(userProvidedRange,bookingRange)){
            // already booked
            isBooked = true;
          }
          

        });
        
        if(!isBooked){
          filteredProperties.push(property);
        }

      }
    });
    return filteredProperties;
  }

  function SearchPropertyByDistance(msg,callback){

  		var qty = msg.qty;
  		var lat = msg.lat;
  		var long = msg.long;
  		var distance = msg.distance;

	  	// Opens a generic Mongoose Query. Depending on the post body we will...
	    var query = Property.find({ qty: { $gte: qty } });

	    // ...include filter by Max Distance (converting miles to meters)
	    if(distance){

	        // Using MongoDB's geospatial querying features. (Note how coordinates are set [long, lat]
	        query = query.where('location').near({ center: {type: 'Point', coordinates: [long, lat]},

	            // Converting meters to miles. Specifying spherical geometry (for globe)
	            maxDistance: distance * 1609.34, spherical: true});
	    }
	    
	    // ... Other queries will go here ... 

	    // Execute Query and Return the Query Results
	    query.exec(function(err, properties){
	        if(err)
	        {
	        	callback(null,{"status":400,"result":err})
	            //res.send(err);
	        }
	        else{
	       		var refinedProperties = filter(properties,msg.start_date,msg.end_date);
	       		callback(null,{"status":200,"refinedProperties":refinedProperties}); 	
	        }
	       
	    });




  }




function createProperty(msg,callback){


	//console.log(msg.property);

	var newProperty = Property(msg.property);
	console.log(newProperty);
/*	newProperty.save(function(err,result){

		if(!err){
			console.log(result);
			callback(null,{"status":200,"result":"Property created"});
			}
		else{
			console.log(err);
			callback(err,{"status":400,"result":"Bad Request"});
		}
	});*/
	callback(null,{"status":200,"result":"Property created"});
}

function UpdateProperty(msg,callback){
	console.log("message"+JSON.stringify(msg));

	Property.update(msg.query,{$set:msg.property}, function(error, property) {
		console.log(error);
		console.log(property);
		if(!error)
		{

			callback(null,{"status":200,"result":"Property updated"});
		}
		else{
			callback(null,{"status":400,"result":"Bad Request"});
		}
		
	});
}

function BookProperty(msg,callback){



	Property.update(msg.query,{$push:{bookings:msg.obj}}, function(error, property) {
		if(!error)
		{
			//res.status(200);*/
			callback(null,{"status":200,"result":"Property Booked","property":property});
		}
		else{
			console.log(error);
			callback(null,{"status":400,"result":"Bad Request","property":null});
		}
		
	});
}

function SearchPropertyById(msg,callback){
console.log("inside SearchPropertyById rabbitMQ"+msg);
	Property.findOne({"property_id":msg.property_id},function(err,property){
		
		if(!err){

			callback(null,{"status":200,"property":property});			
			}
		else
		{
			console.log(err);
			callback(null,{"status":400,"result":"Bad Request"});			
		}

	});

}


var getAuctionableProperties = function(msg, callback) {
	

	Property.find({'ListingType':"auction","ListingDate":{"$gte":msg.validListingDate}},function(err,properties){
		if(!err){

			callback(null,{"status":200,"properties":properties});			
			}
		else
		{
			console.log(err);
			callback(null,{"status":400,"result":"Bad Request"});			
		}
	});

}

var getMaxBid = function(msg, callback) {
	


	Property.findOne({"property_id":msg.property_id},function(err, property) {
		if(!err){

			callback(null,{"status":200,"property":property});			
			}
		else
		{
			console.log(err);
			callback(null,{"status":400,"result":"Bad Request"});			
		}
	})
}

var getUserBids = function(msg, callback) {
	

	Bid.find({"user.emailId":msg.emailId}, function(err, result) {
		if(!err){

			callback(null,{"status":200,"result":result});			
			}
		else
		{
			console.log(err);
			callback(null,{"status":400,"result":"Bad Request"});			
		}
	});
}

exports.createProperty = createProperty;
exports.SearchPropertyByDistance = SearchPropertyByDistance;
exports.UpdateProperty = UpdateProperty;
exports.BookProperty = BookProperty;
exports.SearchPropertyById = SearchPropertyById;
exports.getAuctionableProperties = getAuctionableProperties;
exports.getMaxBid = getMaxBid;
exports.getUserBids = getUserBids;