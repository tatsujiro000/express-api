const passport = require("passport");
const LocalStrategy = require("passport-local");
const con = require('../database');
const bcrypt = require("bcrypt");


module.exports = function (app) {
    passport.use(new LocalStrategy({
            usernameField: "userName",
            passwordField: "password",
        }, function(username, password, done){

        }
    ));
};