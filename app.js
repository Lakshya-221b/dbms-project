var express=require("express");
var app=express();
var bodyParser = require("body-parser");
var mysql=require('mysql');
var crs,fee;
var flag=1;
//var mongoose = require("mongoose");
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "lakshya17",
    database: "mydb"
});
con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT* FROM course", function (err, result, fields) {
        if (err) throw err;
        crs=result;
        //console.log(result);
    });
    con.query("SELECT* FROM fee", function (err, result, fields) {
        if (err) throw err;
        fee=result;
        //console.log(result);
    });
});

//mongoose.connect("mongodb://localhost/yelp_camp");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/student", function(req, res){
    res.render("student");
});

app.post("/student",function (req,res) {
   var rol=req.body.roll;
   var pass=req.body.pass;
    con.query("SELECT * FROM student WHERE roll = " + mysql.escape(rol), function (err, result, fields) {
        if (err) throw err;
        std=result[0];
        console.log(std);
        if(std.ldap_pass == pass ) {
            res.redirect("/studentlog");
        }
        else{
            res.redirect("/student");
        }
    });
});

app.get("/studentlog",function (req,res) {
    res.render("studentlog",{student:std});
});

app.get("/faculty", function(req, res){
    res.render("faculty");
});

app.get("/course", function(req, res){
    res.render("course",{courses:crs});
});

app.get("/fee", function(req, res){
    res.render("fee",{fees:fee});
});
app.listen(8080,function(){
    console.log("The IIIT-A Server Has Started!");
});