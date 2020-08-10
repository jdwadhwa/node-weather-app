var request =  require("request");


var weathercode = (lat,long,callback)=>{

    var url = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+long+"&%20exclude=hourly,daily&appid=9ddecc0d2eb23f8354d4b427896aa9b5";

    request({url:url,json:true},(err,res)=>{

        if(err)
        {
            callback("you have some net issues",undefined);
        }
        else if(res.body.cod=="400")
        {
            callback("please tell the correect location",undefined)
        }
        else{
            var data= {
                temp:res.body.current.temp,
                humidity: res.body.current.humidity
            }
            callback(undefined,data);
        }
        
    })

}

module.exports =weathercode;