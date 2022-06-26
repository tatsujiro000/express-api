const passport = require("passport");
const LocalStrategy = require("passport-local");
const con = require('../database');
const bcrypt = require("bcrypt");
const User = require("../models/user");
const cookieSession = require("cookie-session");
const secret = "secretCuisine123";



module.exports = function (app) {
    passport.serializeUser(function(user, done) {
        console.log("serializeUser");
        done(null, user.id);
    });

    passport.deserializeUser(async function (id, done) {
        console.log("deserializeUser");
        try {
            const user = await User.findById(id);
            console.log("成功している");
            console.log(id);
            console.log("デシリアライズに成功しているuser",user);
            done(null, user);
        } catch (error) {
            console.log("deserializeUserに失敗");
            done(error, null);
        }
    });
      
      
    passport.use(new LocalStrategy({
            usernameField: "userName",
            passwordField: "password",
        }, function(username, password, done){

            const select = `select * from users where name like '${username}';`;
            console.log(username);
            console.log('rootのはず↑');

            try {
                // con.query(select, req.body, async function(err, results){
                con.query(select, async function(err, results){

                    if(err)throw err;
                    if(results.length === 0){
                        console.log(message);
                        return done(null,false,{ message: "ユーザー名かパスワードが一致しません" });
                        console.log(message);
                    }else if(await bcrypt.compare(password, results[0].password)){
                        console.log('results[0]',results[0]);
                        return done(null, results[0]);
                        
                    }else{
                        console.log(message);
                        return done(null,false,{ message: "ユーザー名かパスワードが一致しません" });
                    }
                });
            } catch (err) {
                console.log(err);
                return done(null, false, { message: err.toString(3) })            
            }

        }
    ));

    app.use(
        cookieSession({
          name: "session",
          keys: [secret],
          // Cookie Options
          maxAge: 24 * 60 * 60 * 1000, // 24 hours
        })
    );
    
    app.use(passport.initialize());
    app.use(passport.session());
};


