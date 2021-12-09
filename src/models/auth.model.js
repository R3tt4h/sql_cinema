'use strict';

var dbConn = require('./../../config/db.config');

var User = function(user) {
    this.username = user.username;
    this.password = user.password;    
}

User.findByLog = function (username, password, result) {

    dbConn.query("SELECT id, username, password FROM `users` WHERE username='"+username+"' and password = '"+password+"'", function(err, res) {       
    if(err) {
        console.log("error: ", err);
        result(err, null);
    } else {
        console.log('log: ', res);
        result(null, res);
    }
    });
}


module.exports = User;