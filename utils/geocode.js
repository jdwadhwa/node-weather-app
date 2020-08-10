var request= require("request");



var geocode = (address,callback)=>{
    var url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?access_token=pk.eyJ1IjoiamF0aW4td2FkaHdhIiwiYSI6ImNrZGhyb3A5eTVsMzYydHFyc3lpNjQxbjcifQ.xJ12BlSmFNQwxFNiPh-dEQ&limit=1"

    request({url:url,json:true},(err,res)=>{
        if(err)
        {
            callback("you have a net problem",undefined);
        }
        else if(res.body.features.length==0)
        {
            callback("the location does not exist",undefined);
        }
        else{
            var da ={
                latitude:res.body.features[0].geometry.coordinates[0],
                longitude:res.body.features[0].geometry.coordinates[1],
                placename:res.body.features[0].place_name
            }
            callback("no",da);
        }
    })


}

module.exports =geocode;