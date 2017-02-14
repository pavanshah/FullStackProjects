var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var mongo = require('./mongo');
var loginDatabase = "mongodb://localhost:27017/login";
var Users = require('../Models/user');
var Hosts = require('../Models/host');
var bcrypt = require('bcryptjs');
var mq_client = require('../rpc/client');
module.exports = function(passport) {
  passport.use('user',new LocalStrategy({usernameField: 'email'},
  function(username, password, done) {

    var msg_payload = {
      "func":"Authenticate",
      "email":username
    };


  console.log("I am checking here"+username);
  console.log("I am checking password"+password);

mq_client.make_request('user_queue',msg_payload,function(err,user){

    if(err){

     // console.log("passport got error from rabbit");
      console.log(err);
    }

    if(!err){

      //console.log("passport didn't get error from rabbit");
      console.log(user);

      if(!user){


        console.log("Wrong Email");
        return done(null, false, { message: 'Incorrect email.' });
      }

      var hash = user.password;
    console.log(hash);
    if(!bcrypt.compareSync(password, hash)){
      console.log("Wrong password");
      return done(null, false, { message: 'Incorrect password.' });
    }
    console.log("Correct password");

    returnedUser = new Users(user);
  
    if(!returnedUser.isActive(user)){
      console.log("inactive");
      return done(null, false, { message: 'Your account is waiting for Admin approval.' }); 
    }

    return done(null, user);


    }
  })





}));


  /*Users.findOne({ email: username }, function (err, user) {
  if (err) { return done(err); }
  if (!user) {
    console.log("Wrong Email");
    return done(null, false, { message: 'Incorrect email.' });
  }         
  console.log(user);
  var hash = user.password;
  console.log(hash);
    if(!bcrypt.compareSync(password, hash)){
      console.log("Wrong password");
      return done(null, false, { message: 'Incorrect password.' });
    }
    console.log("Correct password");
  
    if(!user.isActive(user)){
      console.log("inactive");
      return done(null, false, { message: 'Your account is waiting for Admin approval.' }); 
    }

  return done(null, user);
});
}
)) 
*/

 passport.use('host',new LocalStrategy({
          usernameField: 'email'
      },
      function(username, password, done) {
        console.log("I am checking here"+username);
        console.log("I am checking password"+password);
        Hosts.findOne({ email: username }, function (err, user) {
          if (err) { return done(err); }
          if (!user) {
            console.log("Wrong Email");
            return done(null, false, { message: 'Incorrect email.' });
          }         
          var hash = user.password;
        console.log(hash);
            if(!bcrypt.compareSync(password, hash)){
              console.log("Wrong password");
              return done(null, false, { message: 'Incorrect password.' });
            }
            console.log("Correct password");
          
          return done(null, user);
        });
      }
));
};


 