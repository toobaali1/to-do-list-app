
module.exports.getDate = function (){
    let date =  new Date();
    let options = {
        weekday: "long", 
        month: "long",
        day: "2-digit"
    }

    let day = date.toLocaleDateString("en-US", options);
    return day;

}


module.exports.getDay = function(){
    let date =  new Date();
    let options = {
        weekday: "long"
    }

    let day = date.toLocaleDateString("en-US", options);
    return day;

}
