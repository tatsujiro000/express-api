const express = require("express");
const con = require('../database');
const bcrypt = require("bcrypt");
const router = express.Router();

router.get('/', function(req, res, next){
    const userId = req.session.userid;
    const isAuth = Boolean(userId);

    res.render('signup', {
        title:'Sign up',
        isAuth: isAuth,
    });
});


router.post('/', function(req, res, next){
    const userId = req.session.userid;
    const isAuth = Boolean(userId);

    const username = req.body.userName;
    const password = req.body.password;
    const rePassword = req.body.rePassword;

    const select = `select * from users where name like '${username}';`;

    try {
        console.log(username);
        console.log(password);
        console.log(rePassword);
        con.query(select, req.body, async function(err, result){
            if(err)throw err;
            console.log(result);
             if(result.length !== 0){
                res.render("signup", {
                    title:"Sign up",
                    isAuth: isAuth,
                    errorMessage:["このユーザーは使われています。"],
                })
            }else if( password === rePassword) {
                const hashedPassword = await bcrypt.hash(password, 10);
                const insert = `insert into users (name, password) values ('${username}', '${hashedPassword}' );`;

                con.query(insert, req.body, function(err, result){
                    console.log(result);
                    res.redirect("/");
                });
            }else {
                res.render("signup", {
                    title:"Sign up",
                    isAuth: isAuth,
                    errorMessage:["パスワードが一致しません"],
                })
            }
        });

    } catch (err) {
        console.log(err);            
    }

    // connection.query(
    //     `select * from users where name like 'aaa';`,
    //     (error,result) => {
    //         try {
    //             console.log(username);
    //             console.log(result);
    //         } catch (error) {
    //             console.log(error);
    //         }
    
    //     }
    // );
});
module.exports = router;