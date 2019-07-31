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
app.get("/", function (req, res) {
    // res.send("it's working!")
    var requestURL = "https://api.unsplash.com/photos/random?client_id=2efa248d55b9d227366470869adfd84bc6cf9800c569e22933499dff6c789a38"
    request(requestURL, function (error, response, body) {//this is Async
        // console.log('error:', error); // Print the error if one occurred
        // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        // console.log('body:', body); // Print the API data
        if (!error) {
            var parsedData = JSON.parse(body);
            // console.log("image.url:", parsedData["urls"]["regular"]);
            var imageURL = parsedData["urls"]["regular"];
            res.render("index", { "imageURL": imageURL })
        }
        else {
            res.render("index", { "error": "Unable to access API" })
        }
    });//request
});//root route

// app.get("/search", function (req, res) {
app.get("/search", async function (req, res) {
    // console.dir(req);
    // console.log(req.query.keyword);
    var keyword = req.query.keyword;

    // getRandomImages_cb(keyword,9,function(imageURLs){
    //     console.log("imageURLs:"+imageURLs);
    //     res.render("results", { "imageURLs": imageURLs })
    // })

    var imageURLs = await getRandomImages_promise(keyword, 9);
    console.log("imageURLs using Promises:" + imageURLs);
    res.render("results", { "imageURLs": imageURLs })



});//search

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
}

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

//server listener to any request
app.listen("5500", "127.0.0.1", function () {//port number,ip address
        console.log("Express Server is Running...")
    });

//for heroku deployment
// app.listen(process.env.PORT,process.env.IP,function(){
//     console.log("Running Express Server...");
// });