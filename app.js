// Installed Nodemon
//  npm i -g nodemon

// Images are from 
//  https://unsplash.com

//todo
//display the images like the other view
//display with favorite icon
//display in rows of 4

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
    var imageURLs = await tools.getRandomImages("", 1);
    res.render("index", { "imageURLs": imageURLs });
});//root route

//search route
app.get("/search", async function (req, res) {
    var keyword = req.query.keyword;
    var imageURLs = await getRandomImages_promise(keyword, 9);

    // console.log("imageURLs using Promises:" + imageURLs);
    res.render("results", { "imageURLs": imageURLs, "keyword": keyword });

});//search

app.get("/api/updateFavorites", function (req, res) {
    var conn = tools.createConnection();

    //adds or removes a line item from the database depending on  the action
    var sql;
    var sqlParams;

    if (req.query.action == "add") {
        sql = "INSERT INTO lab5 (imageURL,keyword) VALUES(?,?)";
        sqlParams = [req.query.imageURL, req.query.keyword];
    }
    else {
        sql = "DELETE FROM lab5 WHERE imageURL=?";
        sqlParams = [req.query.imageURL];
    }
    conn.connect(function (err) {
        if (err) throw err;
        conn.query(sql, sqlParams, function (err, result) {
            if (err) throw err;
        });//query
    });//connect
    res.send("it works");
});//updateFavorites

app.get("/displayKeywords", async function (req, res) {
    var imageURLs = await tools.getRandomImages("", 1);
    var conn=tools.createConnection();
    var sql = "SELECT DISTINCT keyword FROM `lab5` ORDER BY keyword";
    conn.connect(function(err){
        if (err) throw err;
        conn.query(sql,function(err,result){
            if(err) throw err;
            res.render("favorites",{"rows":result, "imageURLs":imageURLs});

            // console.log(result);
        });//query
    });
});//displayKeywords

app.get("/api/displayFavorites",function(req,res){
    var conn=tools.createConnection();
    var sql="SELECT imageURL FROM lab5 WHERE keyword=?";
    var sqlParams=[req.query.keyword];
    conn.connect(function(err){
        if (err) throw err;
        conn.query(sql,sqlParams,function(err,result){
            if(err) throw err;
            res.send(result);
        });//query
    });
});//displayFavorites

/**
* return random image URLs from an API
* @param string keyword-search term
* @param int imageCount-number of random imageURLs
* @return array of image URLs
**/
function getRandomImages_cb(keyword, imageCount, callback) {
    var requestURL = "https://api.unsplash.com/photos/random?query=" + keyword + "&count=" + imageCount + "&client_id=2efa248d55b9d227366470869adfd84bc6cf9800c569e22933499dff6c789a38"
    request(requestURL, function (error, response, body) {//this is Async
        if (!error) {
            var parsedData = JSON.parse(body);
            var imageURLs = [];
            for (let i = 0; i < 9; i++) {
                imageURLs.push(parsedData[i].urls.regular);
            }
            // console.log(imageURLs);
            // return imageURLs;
            callback(imageURLs);
        }
        else {
            // res.render("results", { "error": "Unable to access API" })
            console.log("error", error)
        }
    });
}//getRandomImages_cb

/**
* return random image URLs from an API
* @param string keyword-search term
* @param int imageCount-number of random imageURLs
* @return array of image URLs
**/
function getRandomImages_promise(keyword, imageCount) {
    var requestURL = "https://api.unsplash.com/photos/random?query=" + keyword + "&count=" + imageCount + "&client_id=2efa248d55b9d227366470869adfd84bc6cf9800c569e22933499dff6c789a38"
    return new Promise(function (resolve, reject) {
        request(requestURL, function (error, response, body) {//this is Async
            if (!error) {
                var parsedData = JSON.parse(body);
                var imageURLs = [];
                for (let i = 0; i < 9; i++) {
                    imageURLs.push(parsedData[i].urls.regular);
                }
                // console.log(imageURLs);
                // return imageURLs;
                resolve(imageURLs);
            }
            else {
                // res.render("results", { "error": "Unable to access API" })
                console.log("error", error)
            }
        });
    })
}

//server listener
// app.listen("5500","127.0.0.1",function(){
//     console.log("Express Server is Running...")
// })

// //server listener to any request
app.listen("5500", "127.0.0.1", function () {//port number,ip address
    console.log("Express Server is Running...")
});

// // for heroku deployment
// app.listen(process.env.PORT,process.env.IP,function(){
//     console.log("Running Express Server...");
// });