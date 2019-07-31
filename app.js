//app.js
const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use(express.static("public"));

const request = require("request");


const mysql = require("mysql");

//routes

//root route
app.get("/", function (req, res) {
    // res.send("it's working!")
    var requestURL="https://api.unsplash.com/photos/random?client_id=2efa248d55b9d227366470869adfd84bc6cf9800c569e22933499dff6c789a38"
    request(requestURL, function (error, response, body){//this is Async
        // console.log('error:', error); // Print the error if one occurred
        // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        // console.log('body:', body); // Print the API data
        if(!error){
            var parsedData=JSON.parse(body);
            // console.log("image.url:", parsedData["urls"]["regular"]);
            var imageURL= parsedData["urls"]["regular"];
            res.render("index", {"imageURL": imageURL} )
        }
        else{
            res.render("index", {"error": "Unable to access API"})
        }

    });//request

});

app.get("/search", function (req, res) {
    req.send("hi!");
});//search

//server listener
// app.listen("5500","127.0.0.1",function(){
//     console.log("Express Server is Running...")
// })

//server listener to any request
// app.listen("8081","0.0.0.0",function(){//port number,ip address
// app.listen("5500","127.0.0.1",function(){//port number,ip address, callback function to display the message
app.listen("5500", "127.0.0.1", function () {//port number,ip address

    console.log("Express Server is Running...")
});

// app.listen(process.env.PORT,process.env.IP,function(){
//     console.log("Running Express Server...");
// });