const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname+"/date.js");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine" , "ejs");
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todoDB", {useNewUrlParser:true, useUnifiedTopology:true});

// make item schema
const itemSchema = {
    name: String
}

// make item model
const Item = mongoose.model("Item", itemSchema);

let day = date.getDate();
app.get("/", function(req,res){
    Item.find({},function(err, foundTaskList){
       if(err){
        console.log(err);
       }
        else{
           
            res.render("list", {listTitle: "Tasks", listItem: foundTaskList , dateTitle: day});
        }
        
    });
});

app.post("/", function(req,res){

    const item = new Item({
        name: req.body.newItem
    });

    if(req.body.submitBtn === "Tasks") {
        item.save();
        res.redirect("/");
    }

    else if(req.body.submitBtn === "Chores"){
        choreItems.push(item);
        res.redirect("/chores");
    }
   
});

app.post("/delete", function(req,res){
    const checkedID = req.body.submitCheckbox;
    Item.findByIdAndRemove(checkedID, function(err){});
    res.redirect("/")
    
});

app.listen(3000, function(){
    console.log("Server running at port 3000");
    
});

