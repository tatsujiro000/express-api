const express = require("express");
const con = require('../database');
const bcrypt = require("bcrypt");

const router = express.Router();

router.get('/', function(req, res, next){
    const userId = req.session.userid;
    const isAuth = Boolean(userId);

    res.render('signin', {
        title:'SignIn',
        isAuth: isAuth
    });
});


router.post('/', function(req, res, next){
    const userId = req.session.userid;
    const isAuth = Boolean(userId);
    const username = req.body.userName;
    const password = req.body.password;

    const select = `select * from users where name like '${username}';`;

    try {
        // console.log(username);
        // console.log(password);
        con.query(select, req.body, async function(err, results){

            if(err)throw err;
            // console.log(results);
            if(results.length === 0){
                return res.render("signin", {
                    title:"Sign in",
                    isAuth: isAuth,
                    errorMessage:["ユーザー名かパスワードが一致しません"],
                })
            }else if(await bcrypt.compare(password, results[0].password)){
                req.session.userid = results[0].id;
                res.redirect("/");
                res.render("/", {
                    signinname:"ようこそ ${username}さん",
                    isAuth: isAuth
                })
            }else{
                return res.render("signin", {
                    title:"Sign in",
                    isAuth: isAuth,
                    errorMessage:["ユーザー名かパスワードが一致しません"],
                })
            }
        });

    } catch (err) {
        console.log(err);            
    }

    // connection.query(
    //     `select * from users where name like 'aaa';`,
    //     (error,results) => {
    //         try {
    //             console.log(username);
    //             console.log(results);
    //         } catch (error) {
    //             console.log(error);
    //         }
    
    //     }
    // );
});
module.exports = router;