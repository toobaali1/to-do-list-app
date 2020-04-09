
module.exports.getDate = function (){
    const date =  new Date();
    let options = {
        weekday: "long", 
        month: "long",
        day: "2-digit"
    }

    const day = date.toLocaleDateString("en-US", options);
    return day;

}

module.exports.getDay = function(){
    const date =  new Date();
    let options = {
        weekday: "long"
    }

    const day = date.toLocaleDateString("en-US", options);
    return day;
}
