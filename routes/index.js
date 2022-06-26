const express = require("express");
const con = require('../database');
const router = express.Router();


let cheeses = [];



con.connect((err) => {
    if (err) {
      console.log('error connecting: ' + err.stack);
      return
    }
    console.log('success');
  });

router.get('/', function (req, res, next) {
  const isAuth = req.isAuthenticated();
  //passportライブラリの関数でログイン状態を確認できる


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
    const isAuth = req.isAuthenticated();
    const userId = req.user.id;
    console.log('req', req);


    con.connect((err) => {
      if (err) {
        console.log('error connecting: ' + err.stack);
        return
      }
      console.log('success');
    });
    let cheese = {
        name: req.body.name,
        country: req.body.country,
        variety: req.body.variety,
        user_id: userId,
    }
    con.query(
        `insert into cheeses (name, country, variety, user_id) values ('${cheese.name}', '${cheese.country}', '${cheese.variety}', '${cheese.user_id}' );`,
        (error, results) => {
            console.log(error);
            res.redirect("/");
        }
    );
  });
  



router.use('/signup', require('./signup'));
router.use('/signin', require('./signin'));
router.use('/logout', require('./logout'));

module.exports = router;
