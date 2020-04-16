const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname+"/date.js");
const mongoose = require("mongoose");
const _ = require("lodash");

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

// make list schema
const listSchema = {
    name: String,
    items: [itemSchema]
}

// make list model
const List = mongoose.model("List", listSchema);

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

    const listName = req.body.submitBtn;
    const itemName = req.body.newItem;

    const item = new Item({
        name: itemName
    });

    if(listName === "Tasks") {
        item.save();
        res.redirect("/");
    }

    else {
        List.findOne({name: listName}, function(err,foundList){
            foundList.items.push(item);
            foundList.save();
            res.redirect("/"+ listName); 
        });
    }
   
});

app.post("/delete", function(req,res){
    const checkedID = req.body.submitCheckbox;
    const listName = req.body.listNameBtn;

    if(listName === "Tasks"){
        Item.findByIdAndRemove(checkedID, function(err){});
        res.redirect("/")
    }
    else{
        List.findOneAndUpdate({name:listName},{$pull:{items:{_id:checkedID}}}, function(err, results){});
        res.redirect("/"+listName);
    }
    
});

app.get("/:otherList", function(req,res){

    const listName = _.capitalize(req.params.otherList);
    
    List.findOne({name: listName }, function(err, foundList){
        if(!foundList){
            // add list
            const list = new List({
                name: listName,
                items: []
            });

            list.save();
            res.redirect("/"+listName)
        }
        else{
            // show an existing list
            res.render("list", {listTitle: listName, listItem: foundList.items , dateTitle: day});   
        }
    }); 
    
});

app.listen(3000, function(){
    console.log("Server running at port 3000");
    
});
