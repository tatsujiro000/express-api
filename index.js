const express = require("express");

const app = express();
app.use(express.json());
app.set("view engine", "ejs");


app.listen(3000, console.log("サーバーが開始"));

//チーズ情報のデータ
let cheeses = [
    { name: "ブリー・ド・モー", id: 1, country: "フランス", variety: "白カビチーズ" },
    { name: "アネヴァト", id: 2, country: "ギリシャ", variety: "フレッシュチーズ" },
    { name: "べジョス", id: 3, country: "ギリシャ", variety: "フレッシュチーズ" },
    { name: "ブローダーケーゼ", id: 4, country: "スイス", variety: "フレッシュチーズ" },
    { name: "ザウワーケーゼ", id: 5, country: "オーストリア", variety: "フレッシュチーズ" },
    { name: "ブルース・デュ・ローヴ", id: 6, country: "フランス", variety: "フレッシュチーズ" },
];


app.get("/", (req,res,next) =>{
    // res.send("GETされてるよ〜");
    res.render("index", {
        text: "I'm チーズAPI",
        cheeses: cheeses,
    });
});


//データを取得
// app.get("/api/cheeses", (req,res) => {
//     res.send(cheeses);
// });

// app.get("/api/cheeses/:id", (req,res) => {
//     const cheese = cheeses.find((cheeses) => cheeses.id === parseInt(req.params.id));
//     res.send(cheese);
// });

//データを送信
// app.post("/api/cheeses", (req,res) => {
//     const cheese = {
//         name: req.body.name,
//         id: cheeses.length + 1,
//         country: req.body.country,
//         variety: req.body.variety,
//     }
//     cheeses.push(cheese);
//     res.send(cheese);
// });

app.post("/", (req,res) => {
    let cheese = {
        name: req.body.name,
        id: cheeses.length + 1,
        country: req.body.country,
        variety: req.body.variety,
    }
    cheeses.push(cheese);
    res.redirect("/");
});

//データを更新
// app.put("/api/cheeses/:id",(req,res) =>{
//     const cheese = cheeses.find((cheeses) => cheeses.id === parseInt(req.params.id));
//     cheese.name = req.body.name;
//     res.send(cheeses);
// });

//データを削除
// app.delete("/api/cheeses/:id",(req,res) =>{
//     const cheese = cheeses.find((cheeses) => cheeses.id === parseInt(req.params.id));
//     const index = cheeses.indexOf(cheese);
//     cheeses.splice(index, 1);
//     res.send(cheeses);
// });

module.exports = app;