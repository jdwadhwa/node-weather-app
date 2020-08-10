

fetch("http://localhost:3000/weather?address=delhi").then((res)=>{
    res.json().then(re=>{
        console.log(re);
    }).catch(er=>{
        console.log(er);
    })
})


var x= document.querySelector("form");

x.addEventListener("submit",search);

var z= document.querySelector("#temp");
var l = document.querySelector("#humid")
function search(e) {
    e.preventDefault();
    var y = document.querySelector("#loca");
    var location = y.value;
    fetch("http://localhost:3000/weather?address="+location).then((res)=>{
    res.json().then(re=>{
        z.innerHTML="the temperature is " + re.temp + " and the humidity is "+ re.humidity;
        y.value = "";
       
    }).catch(er=>{
        z.innerHTML = "you provided the wrong addresss";
        y.value = "";
    })
}).catch(err=>{
    console.log("you have not given the address only please give the address");
})
    
}