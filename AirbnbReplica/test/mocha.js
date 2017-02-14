/**
 * New node file
 */
var expect  = require("chai").expect;
var request = require("request");
var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
var have = chai.have;
var app = require('../app');

chai.use(chaiHttp);

describe("Homepage Check", function() {

    var url = "http://localhost:3000/";

    it("returns status 200", function(done) {
      request(url, function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });

});


describe("Auctions Listing Check", function() {

    var url = "http://localhost:3000/getAuctionableProperties";

    it("returns status 200", function(done) {
      request(url, function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });

});


describe("Admin Host Approval Requests", function() {

    var url = "http://localhost:3000/getHostsForAdmin?type=&address=&query=new";

    it("returns status 200 and list of Hosts pending for approval", function(done) {
      request(url, function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });


});


describe("Search Properties", function() {

    var should = require('chai').should();
    var options = {'url': "http://localhost:3000", 'port': 80}

    var myJSONObject = { "latitude": 37.3382082,
  "longitude": -121.88632860000001,
  "start_date": '2016-12-26T08:00:00.000Z',
  "end_date": '2016-12-28T08:00:00.000Z',
  "qty": '1' 
    }

    it("returns status 200 and give all the listings for provided date and place", function(done) {

      request({
    url: "http://localhost:3000/SearchPropertyByDistance",
    method: "POST",
    json: true,   // <--Very important!!!
    body: myJSONObject
}, function (error, response, body){


    //expect(response.body).to.have('refinedProperties');
     //response.should.have.property('refinedProperties:'); 
     //console.log("response body",response.body); 
     response.should.be.a('object'); 
     should.exist(response.body);
        done();
});



      });
  });

