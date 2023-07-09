//jshint eversion:6

const express= require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https =require("https");

const app=express();
app.use(express.static("public"));  
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
})

app.post("/",function(req,res){ 
    const firstName=req.body.fname;
    const lastName=req.body.sname;
    const email=req.body.mail;

    var data={
        members:[
            {
                email_address:email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    SNAME: lastName
                }
            }
        ]
    }


    var jsonData= JSON.stringify(data);

    const url ="https://us21.api.mailchimp.com/3.0/lists/0a0718099d";

    const option ={
        method:"POST",
        auth:"yogi:aeca729a8fb46dca0560fa32d8cfa25b-us21"   
    }

    const request = https.request(url,option,function(response) {

        if(response.statusCode === 200){
            res.sendFile(__dirname+"/success.html");
        }  else{
            res.send(__dirname+"/failure.html");
        }


        response.on("data",function(data){
            console.log(JSON.parse(data));
        })


    })

  request.write(jsonData);
  request.end();

})

app.post("/failur",function(req,res){
    res.redirect("/");
})

app.listen(3000, function(){
    console.log("Server is running on port 3000");
})




//aeca729a8fb46dca0560fa32d8cfa25b-us21   API KEY
//0a0718099d   audience id 