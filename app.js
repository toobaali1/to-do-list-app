const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname+"/date.js");


const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine" , "ejs");

let items = ["Wash Clothes"];

app.get("/", function(req,res){
    
    let day = date.getDate();
    res.render("list", {listTitle: day, listItem: items});
});

app.post("/", function(req,res){
    let item = req.body.newItem;
    items.push(item);
    res.redirect("/");
});

app.listen(3000, function(){
    console.log("Server running at port 3000");
    
});

