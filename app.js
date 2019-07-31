// Installed Nodemon
// npm i -g nodemon
//app.js
const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use(express.static("public"));

const request = require("request");
const mysql = require("mysql");
const tools = require("./tools.js");

//routes
app.get("/", async function (req, res) {
    var imageURLs = await tools.getRandomImages("",1);
    console.log("imageURLs using Promises:" + imageURLs);
    res.render("index", { "imageURL": imageURLs });
});//root route

//search route
app.get("/search", async function (req, res) {
    var keyword = req.query.keyword;
    var imageURLs = await getRandomImages_promise(keyword, 9);

    console.log("imageURLs using Promises:" + imageURLs);
    res.render("results", { "imageURLs": imageURLs });
});//search

//server listener to any request
app.listen("5500", "127.0.0.1", function () {//port number,ip address
    console.log("Express Server is Running...")
});

//for heroku deployment
// app.listen(process.env.PORT,process.env.IP,function(){
//     console.log("Running Express Server...");
// });