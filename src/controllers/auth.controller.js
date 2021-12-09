'use strict';

const User = require('../models/auth.model');

exports.login = async function(req, res){
    var message = ''; 

    if(req.method == "POST"){
        var post  = req.body;
        var username = post.username;
        var password= post.password;

        User.findByLog(username, password, function(err, user) {
            console.log(user)
            if(user.length){
                req.session.userId = user[0].id;
               req.session.user = user[0];
               console.log(user[0].id);
               console.log(req.session);
                res.redirect('/');
             }
             else{
                message = 'Invalid username or password.';
                res.render('login.ejs',{message: message});
            }
        });
    } else {
       res.render('login.ejs', { message: message});
    }

 };

exports.logout = function(req,res){
    req.session.destroy(function(err) {
       res.redirect("/login");
    })
};
 