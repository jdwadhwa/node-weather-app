var ram= (a,b,callback)=>{

    setTimeout(()=>{
        var data = a+b;

        callback(data);


    },2000)
};



ram(1,4,(da)=>{
    console.log(da);
})

