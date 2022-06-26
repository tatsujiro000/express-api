const express = require("express");
// const passport = require("../config/passport");
// const con = require('../database');
// const bcrypt = require("bcrypt");
const router = express.Router();
const passport = require("passport");


router.get('/', function(req, res, next){
    const isAuth = req.isAuthenticated();

    res.render('signin', {
        title:'SignIn',
        isAuth: isAuth
    });
});




router.post('/', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/signin',
    failureFlash: true,
}));
 // passportの導入に伴いコメントアウト↓↓↓
// router.post('/', function(req, res, next){
//     successRedirect: '/',
//     failureRedirect: '/signin',
//     failureFlash: true,
   
//     const userId = req.session.userid;
//     const isAuth = Boolean(userId);
//     const username = req.body.userName;
//     const password = req.body.password;

//     const select = `select * from users where name like '${username}';`;

//     try {
//         con.query(select, req.body, async function(err, results){

//             if(err)throw err;
//             if(results.length === 0){
//                 return res.render("signin", {
//                     title:"Sign in",
//                     isAuth: isAuth,
//                     errorMessage:["ユーザー名かパスワードが一致しません"],
//                 })
//             }else if(await bcrypt.compare(password, results[0].password)){
//                 req.session.userid = results[0].id;
//                 res.redirect("/");
//                 res.render("/", {
//                     signinname:"ようこそ ${username}さん",
//                     isAuth: isAuth
//                 })
//             }else{
//                 return res.render("signin", {
//                     title:"Sign in",
//                     isAuth: isAuth,
//                     errorMessage:["ユーザー名かパスワードが一致しません"],
//                 })
//             }
//         });

//     } catch (err) {
//         console.log(err);            
//     }
// });
module.exports = router;