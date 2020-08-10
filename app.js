var request = require("request");
const geocode = require("./utils/geocode");
var express = require("express");

var path = require("path");
var app= express();

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname+"/public")));



//var x= 33.44179
//var url = "https://api.openweathermap.org/data/2.5/onecall?lat=&lon=-94.037689&%20exclude=hourly,daily&appid=9ddecc0d2eb23f8354d4b427896aa9b5";
var weathercode = require("./utils/weather");

//var geourl = "https://api.mapbox.com/geocoding/v5/mapbox.places/12whatna.json?access_token=pk.eyJ1IjoiamF0aW4td2FkaHdhIiwiYSI6ImNrZGhyb3A5eTVsMzYydHFyc3lpNjQxbjcifQ.xJ12BlSmFNQwxFNiPh-dEQ&limit=1";

// request({url:url,json:true},(error,res)=>{
//     if(error)
//     {
//         console.log("eroor not in url");
//     }
//     else if(res.body.cod=="400")
//     {
//         console.log("eroor in url");
//     }
//     else
//     {
//         console.log(res.body.current.temp+ " "+ res.body.current.humidity);
//     }

// });


// request({url:geourl,json:true},(err,res)=>{
//     if(err)
//     {
//         console.log("eroor in your neytwork");
//     }
//     else if(res.body.features.length==0)
//     {
//         console.log("the place is not available");
//     }
//     else{
//         console.log(res.body.features[0].geometry.coordinates[0]+"     "+res.body.features[0].geometry.coordinates[1]);
//     }



// });


// var geocode = (address,callback)=>{
//     var url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?access_token=pk.eyJ1IjoiamF0aW4td2FkaHdhIiwiYSI6ImNrZGhyb3A5eTVsMzYydHFyc3lpNjQxbjcifQ.xJ12BlSmFNQwxFNiPh-dEQ&limit=1"

//     request({url:url,json:true},(err,res)=>{
//         if(err)
//         {
//             callback("you have a net problem",undefined);
//         }
//         else if(res.body.features.length==0)
//         {
//             callback("the location does not exist",undefined);
//         }
//         else{
//             var da ={
//                 longitude:res.body.features[0].geometry.coordinates[0],
//                 latitude:res.body.features[0].geometry.coordinates[1],
//                 placename:res.body.features[0].place_name
//             }
//             callback("no",da);
//         }
//     })


// }

// geocode("bahadurgarh",(err,da)=>{
//     if(da===undefined)
//     {
//        return  console.log(err);
//     }
//     else
//     {
//         weathercode(da.latitude,da.longitude,(err,dsa)=>{
//             if(dsa==undefined)
//             {
//                 console.log(err);
//             }
//             else{
//                 console.log(dsa.temp,dsa.humidity,da.placename);
//             }
//         })
//     }
// });

app.get("/",(req,res)=>{
    res.render("index");
});

app.get("/help",(req,res)=>{
    res.render("help");
})

app.get("/weather",(req,res)=>{
   
    if(!req.query.address)
    {
     return  res.send("you should enter a address");
    }
    else{
        
        geocode(req.query.address,(err,da)=>{
            if(err!="no")
            {
                return res.send("you should enter a coorect address");
            }
            else{

                weathercode(da.latitude,da.longitude,(error,fore)=>
                {
                    if(error==undefined)
                    {
                        var data = {
                            temp:fore.temp,
                            humidity:fore.humidity,
                        }
                      return  res.send(data);
                    }
                })
            }

        })


        }


    

});


app.get("/about",(re,res)=>{
    res.render("about");
})

app.get("/help/*",(req,res)=>{
    res.render("error",{data:"this help page dows not exist"});
})

app.get("*",(req,res)=>{
    res.render("error",{data:"page is not availabe"});
})


app.listen(3000,()=>{
    console.log("jai shree ram");
})
