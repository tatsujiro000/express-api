const express = require("express");
const router = express.Router();
const mysql = require('mysql');

// const knex = require('../db/knex');
let cheeses = [];

const connection = mysql.createConnection({
    // host: 'localhost',
    host: '127.0.0.1',
    user: 'root',
    password: '*)N5%zSBF&kE',
    database: 'cheeses_api'
});


connection.connect((err) => {
    if (err) {
      console.log('error connecting: ' + err.stack);
      return
    }
    console.log('success');
  });

router.get('/', function (req, res, next) {
    res.render('index', {
        text: 'チーズAPIだよ',
        cheeses: cheeses,
    });
});

// router.get("/", (req,res,next) =>{
//     knex("cheeses")
//         .select("*")
//         .then(function(results){
//             console.log(results);
//             res.render('index',{
//                 text: "I'm チーズAPI",
//                 cheeses: results,
//             })

//         })
//         .catch(function(err){
//             console.log(err);
//             res.render('index',{
//                 text:'エラーです',
//             })
//         })
// });

router.post('/', function (req, res, next) {
    connection.connect((err) => {
      if (err) {
        console.log('error connecting: ' + err.stack);
        return
      }
      console.log('success');
    });
    let cheese = {
        name: req.body.name,
        // id: cheeses.length + 1,
        country: req.body.country,
        variety: req.body.variety,
    }
    connection.query(
        `insert into cheeses (name, country, variety) values ('${cheese.name}', '${cheese.country}', '${cheese.variety}' );`,
        (error, results) => {
            console.log(error);
            res.redirect("/");
        }
    );
  });
  

// router.post("/", (req,res,next) => {
//     knex("cheeses")
//         .insert({id:1, content: cheese})
//         .then(function() {
//             res.redirect("/");
//         })
//         .catch(function (err) {
//             console.error(err);
//             res.render('index', {
//                 title:'エラーです',
//             });
//           });


//     let cheese = {
//         name: req.body.name,
//         // id: cheeses.length + 1,
//         country: req.body.country,
//         variety: req.body.variety,
//     }

    // connection.query(
    //     `insert into cheese (user_id, name, country, variety) values (1, '${cheese.name}', '${cheese.country}', '${cheese.variety}' );`,
    //     (error, results) => {
    //         console.log(error);
    //         res.redirect("/");
    //     }
    //   );

    // cheeses.push(cheese);
// });


module.exports = router;
