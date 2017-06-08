var mongo = require("./mongo");
var mongoURL = "mongodb://vjzaveri:vjzaveri@ds133961.mlab.com:33961/csnet";
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Users = require('./Models/user');
var moment = require('moment');
var Services = require('./Models/service');
var Clusters = require('./Models/cluster');


function cluster_count(msg, callback){
	
	var res = {};
	console.log("IN cluster_count request RabbitMQ");
	//var username = msg.email;
	//var password = msg.password;

	 Clusters
        .count()
        .exec(function (err, result) {
            count = result;
            console.log("Total number of clusters is: ", count);
            callback(null,{"code":200,"count":count});
        });
};


function user_count(msg, callback){
	
	var res = {};
	console.log("IN user_count request RabbitMQ");
	//var username = msg.email;
	//var password = msg.password;

	 Users
        .count()
        .exec(function (err, result) {
            count = result;
            console.log("Total number of users is: ", count);
            callback(null,{"code":200,"count":count});
        });
};


function service_count(msg, callback){
    
    var res = {};
    console.log("IN services count request RabbitMQ");
    //var username = msg.email;
    //var password = msg.password;

     Services
        .count()
        .exec(function (err, result) {
            count = result;
            console.log("Total number of services is: ", count);
            callback(null,{"code":200,"count":count});
        });
};



function top_ten_clusters (msg, callback) {
    var response = {};
 
    callback(null,{"code":200,"data":response});
};

function get_all_clusters(msg, callback){
	
	var res = {};
	console.log("IN get_all_clusters request RabbitMQ");

    mongo.connect(mongoURL, function(){
        console.log('Connected to mongo at: ' + mongoURL);

        var clusterColl = mongo.collection('clusters');

        clusterColl.find({}).toArray(function(err, clusters){
            if (err)
                throw err;
            else {
                console.log("Clusters loaded: ", clusters);
            
                res.code = 200;
                res.data =  clusters;
                        
                callback(null, res);
               
            } 
        });
    });   
};


function get_cluster(msg, callback){
	
    var res= {};
    var cluster_id = msg._id;
    console.log("Handling get cluster: ", cluster_id);
    mongo.connect(mongoURL, function(){
        console.log('Connected to mongo at: ' + mongoURL);

        var coll = mongo.collection('clusters');
        //var user_id_object = require('mongodb').ObjectID(msg.user._id);

        coll.findOne({cluster_id: cluster_id}, function(err, cluster){
            console.log('Query Ran, cluster on the way or not? !!');
            if (err)
                throw err;
            else {
                console.log('Cluster found!: ', cluster);

                res.code = 200;
                res.data = cluster;
                callback(null, res);
            }
        });
    });


};


function remove_cluster(msg, callback){
    
    var res= {};
    var cluster_id = msg._id;
    console.log("Handling remove cluster: ", cluster_id);
    mongo.connect(mongoURL, function(){
        console.log('Connected to mongo at: ' + mongoURL);

        var coll = mongo.collection('clusters');
        //var user_id_object = require('mongodb').ObjectID(msg.user._id);

        coll.remove({cluster_id: cluster_id}, function(err, data){
            
            if (err)
                throw err;

                res.code = 200;
                res.data = data;
                callback(null, res);
        });
    });


};

function remove_service(msg, callback){
    
    var res= {};
    var service_id = msg._id;
    console.log("Handling remove service: ", service_id);
    mongo.connect(mongoURL, function(){
        console.log('Connected to mongo at: ' + mongoURL);

        var coll = mongo.collection('services');
        //var user_id_object = require('mongodb').ObjectID(msg.user._id);

        coll.remove({service_id: service_id}, function(err, data){
            
            if (err)
                throw err;

                res.code = 200;
                res.data = data;
                callback(null, res);
        });
    });


};


function get_service(msg, callback){
    
    var res= {};
    var service_id = msg._id;

    console.log("Handling get service in Rabbit: ", service_id);

    mongo.connect(mongoURL, function(){
        console.log('Connected to mongo at: ' + mongoURL);

        var coll = mongo.collection('services');
        //var user_id_object = require('mongodb').ObjectID(msg.user._id);

        coll.findOne({service_id: service_id}, function(err, service){
            console.log('Query Ran, service on the way or not? !!');
            if (err)
                throw err;
            else {
                console.log('service found!: ', service);

                res.code = 200;
                res.data = service;
                callback(null, res);
            }
        });
    });


};

function create_new_cluster(msg, callback){
	
	var res = {};
	console.log("IN create_new_cluster request RabbitMQ");
    var cluster_id = msg.data.cluster_id;
	var cluster_name = msg.data.cluster_name;
    var users = msg.data.users;
    var availableServices = msg.data.availableServices;
    var moderator = msg.data.moderator;
    
    console.log("IN create_new_cluster request RabbitMQ for cluster + services: ", cluster_name, availableServices);

    mongo.connect(mongoURL, function(){    
    var coll = mongo.collection('clusters'); 

    coll.insertOne({
            cluster_id: cluster_id,
            cluster_name: cluster_name,
            availableServices: availableServices,
            users: users,
            moderator : moderator
        }, function (err, result) {

            if (err) {
                console.log("Error while creating cluster: ", err);
                throw err;
            } else {

                Users.updateOne({"email":moderator},{$set:{"cluster":cluster_id}}, function (err, res) {
                    if(!err){
                        console.log("Cluster added succesfully");
                        res.code = 200;
                        callback(null, res);
                    }
                    else
                    {
                        console.log("Error while creating cluster: ", err);
                        throw err;
                    }
                } );


            }
        });
    });
};

function create_new_service(msg, callback){
    
    var res = {};
    var service_id = msg.data.service_id;
    var service_name = msg.data.servicename;
    var service_owner = msg.data.owner;
    var service_desc = msg.data.description;
    var clusters = msg.data.clusters;
    
    console.log("IN create_new_service request RabbitMQ for service + clusters: ", service_name, clusters);

    mongo.connect(mongoURL, function(){    
    var coll = mongo.collection('services'); 

    coll.insertOne({
            service_id: service_id,
            servicename: service_name,
            owner: service_owner,
            description: service_desc
        }, function (err, result) {

            if (err) {
                console.log("Error while creating service: ", err);
                throw err;
            } else {
                console.log("Service added succesfully");
                addServiceToClusters(service_id, clusters);
                res.code = 200;
                callback(null, res);
            }
        });
    });

    
};

function addServiceToClusters(service_id, clusters) {
    //For each cluster, push the service_id to its tail
 
    clusters.forEach(function(entry) {
        console.log("Adding service: "+ service_id + " to cluster: " + entry);
        mongo.connect(mongoURL, function () {
            console.log('Connected to mongo at: ' + mongoURL);
            var coll = mongo.collection('clusters');

            coll.update({cluster_id: entry}, {$push: {availableServices: service_id}}, function (err, data) {
                if (err) throw err;    
            });

        });
    });
   
}

function get_all_moderators(msg, callback){
	
	var res = {};
	console.log("IN get_all_moderators request RabbitMQ");

    mongo.connect(mongoURL, function(){    
    var coll = mongo.collection('users'); 

    coll.find({UserType: "ClusterOwner"}).toArray(function (err, moderators) {  
                        
        if (err)
            throw err;         
    
            
            res.code = 200;
            res.data = moderators;
            console.log ("Moderators found: ", res);
            
            callback (null, res);
                           
                    
        });
    });
};

function update_service(msg, callback) {
    //For each cluster, push the service_id to its tail
 
    var service_id = msg.data.service_id;
    var new_service_name = msg.data.new_service_name;
    var new_description = msg.data.new_description;
 
    console.log("Updating service: "+ service_id);
    mongo.connect(mongoURL, function () {
        console.log('Connected to mongo at: ' + mongoURL);
        var coll = mongo.collection('services');

        coll.update({service_id: service_id}, {$set: {servicename: new_service_name, description : new_description}}, function (err, data) {
            if (err) throw err;  


            res.code = 200;
            res.data = data;
            callback (null, res);  
        });

    });
}


function update_cluster(msg, callback) {
    //For each cluster, push the service_id to its tail
 
    var cluster_data = {
        "cluster_id":cluster_id,
        "cluster_name":new_cluster_name,
        "new_services":new_services,
        "new_moderator": new_moderator
    }

    var cluster_id = msg.data.cluster_id;
    var cluster_name = msg.data.cluster_name;
    var new_services = msg.data.new_services;
    var new_moderator = msg.data.new_moderator;
 
    console.log("Updating cluster: "+ cluster_id);
    mongo.connect(mongoURL, function () {
        console.log('Connected to mongo at: ' + mongoURL);
        var coll = mongo.collection('clusters');

        coll.update({cluster_id: cluster_id}, {$set: {cluster_name: cluster_name, availableServices : new_services, moderator : new_moderator}
        }, function (err, data) {
            if (err) throw err; 
            res.code = 200;
            res.data = data;
            callback (null, res);     
        });

    });
}


function get_all_service_owners(msg, callback){
    
    var res = {};
    console.log("IN get_all_service_owners request RabbitMQ");
   
    mongo.connect(mongoURL, function(){    
    var coll = mongo.collection('users'); 

    coll.find({UserType: "ClusterOwner"}).toArray(function (err, serviceowners) {  
                        
        if (err)
            throw err;         
                
            res.code = 200;
            res.data = serviceowners;
            console.log ("Serv owners found: ", res);
            
            callback (null, res);
                           
                    
        });
    });
};

function get_all_services(msg, callback){
	
	var res = {};
	console.log("IN get_all_services request RabbitMQ");

    mongo.connect(mongoURL, function(){
        console.log('Connected to mongo at: ' + mongoURL);

        var coll = mongo.collection('services');

        coll.find({}).toArray(function(err, services){
            if (err)
                throw err;
            else {
                console.log("Services loaded: ", services);
            
                res.code = 200;
                res.data =  services;
                        
                callback(null, res);
               
            } 
        });
    });   
};


exports.cluster_count = cluster_count;
exports.user_count = user_count;
exports.top_ten_clusters = top_ten_clusters;
exports.get_all_clusters = get_all_clusters;
exports.get_cluster = get_cluster;
exports.create_new_cluster = create_new_cluster;
exports.get_all_moderators = get_all_moderators;
exports.get_all_services = get_all_services;
exports.get_service = get_service;
exports.service_count = service_count;
exports.create_new_service = create_new_service;
exports.get_all_service_owners = get_all_service_owners;
exports.update_service = update_service;
exports.update_cluster = update_cluster;
exports.remove_service = remove_service;
exports.remove_cluster = remove_cluster;