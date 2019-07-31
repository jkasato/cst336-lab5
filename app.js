//app.js
const express=require("express");
const app=express();

app.set('view engine','ejs');
app.use(express.static("public"));

const request=require("request");
const mysql=require("mysql");

//routes

//root route
app.get("/",function(req,res){
    // res.send("it's working!")
    res.render("index")
});

//server listener
// app.listen("5500","127.0.0.1",function(){
//     console.log("Express Server is Running...")
// })

//server listener to any request
// app.listen("8081","0.0.0.0",function(){//port number,ip address
// app.listen("5500","127.0.0.1",function(){//port number,ip address, callback function to display the message
app.listen("5500","127.0.0.1",function(){//port number,ip address

    console.log("Express Server is Running...")
});

// app.listen(process.env.PORT,process.env.IP,function(){
//     console.log("Running Express Server...");
// });