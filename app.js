const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname+"/date.js");


const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine" , "ejs");
app.use(express.static("public"));

let items = ["Do Homework"];
let workItems = [];
let choreItems = [];

app.get("/", function(req,res){
    
    let day = date.getDate();
    res.render("list", {listTitle: day, listItem: items});
});

app.post("/", function(req,res){
    let item = req.body.newItem;

    if(req.body.submitBtn === "Work") {
        workItems.push(item);
        res.redirect("/work");
    }

    else if(req.body.submitBtn === "Chores"){
        choreItems.push(item);
        res.redirect("/chores");
    }

    else{
        items.push(item);
        res.redirect("/");
    }
   
});

app.get("/work", function(req,res){
    res.render("list", {listTitle:"Work List", listItem: workItems });
});

app.get("/chores", function(req,res){
    res.render("list", {listTitle:"Chores List", listItem: choreItems });
});

app.listen(3000, function(){
    console.log("Server running at port 3000");
    
});

