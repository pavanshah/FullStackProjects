/**
 * Copyright 2017, Google, Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

// [START app]
const express = require('express');

const app = express();
var expressSession = require("express-session");
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var mongoSessionConnectURL = "mongodb://vjzaveri:vjzaveri@ds133961.mlab.com:33961/csnet";
var mongoStore = require("connect-mongo")(expressSession);
var mongo = require("./routes/mongo");
var service = require("./routes/service");
var login = require("./routes/login");
var cluster = require('./routes/cluster');
var serviceowner = require('./routes/serviceowner');
var moderator = require('./routes/moderator');
var logger = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var admin = require("./routes/admin");
//serverurl = "https://cmpe277nodejsserver.appspot.com/"

app.use(expressSession({
	secret: 'cmpe273_teststring',
	resave: false,  //don't save session if unmodified
	saveUninitialized: false,	// don't create session until something stored
	duration: 30 * 60 * 1000,    
	activeDuration: 5 * 60 * 1000,
	store: new mongoStore({
		url: mongoSessionConnectURL
	})
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.use(express.static(path.join(__dirname, '/')));
// Use the built-in express middleware for serving static files from './public'
app.use(express.static(path.join(__dirname, 'public')));

 app.get('/', function(req, res) {
        res.sendfile('public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
//app.get('/', user.login);

app.post('/createCluster', cluster.createCluster);
app.post('/fetchAvailableServices', service.fetchAvailableServices);
app.post('/createNewService', service.createNewService);
app.post('/requestNewService', service.requestService);

app.post('/signIn', login.signIn);
app.post('/signUp', login.signUp);
app.post('/logout', login.logout);
app.get('/getUser', login.getUser);

app.post('/fetchUsersToBeApproved', moderator.fetchUsersToBeApproved);
app.post('/approveUser', moderator.approveUser);
app.post('/rejectUser', moderator.rejectUser);
app.get('/getListOfCluster', cluster.getListOfCluster);

// --------- Admin related ------------
app.get('/admin', admin.getLoginPage);
app.post('/admin_login', admin.login);
app.get('/admin_logout', admin.logout);
app.get('/admin_dashboard', admin.admin_dashboard);
app.get('/totalClusters', admin.totalClusters);
app.get('/totalUsers', admin.totalUsers);
app.get('/topTenClusters', admin.topTenClusters);
app.get('/getAllClusters', admin.getAllClusters);
app.post('/getCluster', admin.getCluster);
app.get('/admin_clusterMgmt', admin.admin_clusterMgmt);
app.get('/admin_createCluster', admin.admin_createCluster);

// --------------------------------------

app.post('/fetchPendingRequests', serviceowner.fetchPendingRequests);
app.post('/approveServiceRequest', serviceowner.approveServiceRequest);
app.post('/rejectServiceRequest', serviceowner.rejectServiceRequest);

// --------- Admin related ------------
app.get('/admin', admin.getLoginPage);
app.post('/admin_login', admin.login);
app.get('/admin_logout', admin.logout);
app.get('/admin_dashboard', admin.admin_dashboard);
app.get('/totalClusters', admin.totalClusters);
app.get('/totalUsers', admin.totalUsers);
app.get('/totalServices', admin.totalServices);
app.get('/topTenClusters', admin.topTenClusters);
app.get('/getAllClusters', admin.getAllClusters);
app.post('/getCluster', admin.getCluster);
app.get('/admin_clusterMgmt', admin.admin_clusterMgmt);
app.get('/admin_createCluster', admin.admin_createCluster);
app.get('/admin_serviceMgmt', admin.admin_serviceMgmt);
app.get('/admin_createService', admin.admin_createService);
app.post('/createClusterAdmin', admin.createClusterAdmin);
app.post('/createService', admin.createService);
app.get('/getAllModerators', admin.getAllModerators);
app.get('/getAllServiceOwners', admin.getAllServiceOwners);
app.get('/getAllServices', admin.getAllServices);
app.post('/getService', admin.getService);
app.post('/updateService', admin.updateService);
app.post('/updateCluster', admin.updateCluster);
app.post('/removeCluster', admin.removeCluster);
app.post('/removeService', admin.removeService);

// --------------------------------------


// Start the server
const PORT = process.env.PORT || 8080;
mongoose.connect(mongoSessionConnectURL, function(){

		console.log('Connected to mongo at: ' + mongoSessionConnectURL);	
		app.listen(PORT, () => {
  		console.log(`App listening on port ${PORT}`);
  		console.log('Press Ctrl+C to quit.');
	});

});

// [END app]
