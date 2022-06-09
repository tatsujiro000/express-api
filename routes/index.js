const express = require("express");
const con = require('../database');
const router = express.Router();

// const knex = require('../db/knex');
// const mysql = require('mysql');


let cheeses = [];

// const con = mysql.createConnection({
//     // host: 'localhost',
//     host: '127.0.0.1',
//     user: 'root',
//     password: '*)N5%zSBF&kE',
//     database: 'cheeses_api'
// });


con.connect((err) => {
    if (err) {
      console.log('error connecting: ' + err.stack);
      return
    }
    console.log('success');
  });

router.get('/', function (req, res, next) {
  const userId = req.session.userid;
  const isAuth = Boolean(userId);


  // knex("cheeses")
  // .select("*")
  // .then(function (results) {
  //   console.log(results);
  //   res.render('index', {
  //   text: "チーズAPIだよ",
  //   cheeses: results,
  //   });
  // })
  // .catch(function (err) {
  //   console.error(err);
  //   res.render('index', {
  //     text: "チーズAPIだよ",
  //   });
  // });
  con.query(
    `select * from cheeses;`,
    (error,results) => {
      console.log(error);
      // console.log(results);
      res.render('index', {
          text: 'チーズAPIだよ',
          cheeses: results,
          isAuth:isAuth,
      });
    }
  );
});


router.post('/', function (req, res, next) {
    const userId = req.session.userid;
    const isAuth = Boolean(userId);

    con.connect((err) => {
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
    con.query(
        `insert into cheeses (name, country, variety) values ('${cheese.name}', '${cheese.country}', '${cheese.variety}' );`,
        (error, results) => {
          // console.log(results);
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

//     con.query(
//         `insert into cheese (user_id, name, country, variety) values (1, '${cheese.name}', '${cheese.country}', '${cheese.variety}' );`,
//         (error, results) => {
//             console.log(error);
//             res.redirect("/");
//         }
//       );

//     cheeses.push(cheese);
// });


router.use('/signup', require('./signup'));
router.use('/signin', require('./signin'));
router.use('/logout', require('./logout'));

module.exports = router;
