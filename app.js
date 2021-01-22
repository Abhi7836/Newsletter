const express=require("express");
const https=require("https");
const bodyParser= require("body-parser");

const app=express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get('/',function(req,res){
  res.sendFile(__dirname+"/signup.html");
});

app.post('/',function(req,res){
  const firstname=req.body.fname;
  const lastname = req.body.lname;
  const email = req.body.email;
  const data = {
    members:[{
      email_address:email,
      status:"subscribed",
      merge_fields:{
        FNAME:firstname,
        LNAME:lastname
      }
    }]
  };
    const jsonData =JSON.stringify(data);
    const url ="https://us7.api.mailchimp.com/3.0/lists/f899bf0d1a";
    const options = {
         method:"POST",
         auth:process.env.Authe
    };
    const request = https.request(url,options,function(response){
    if(response.statusCode === 200){
       res.sendFile(__dirname+"/success.html");
    }
    else{
      res.sendFile(__dirname+"/failure.html");
    }
      response.on("data",function(data){
        console.log(JSON.parse(data));
      });
    });
      request.write(jsonData);
      request.end();
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server is running on port 3000");
});



//api key  :  9d8449c48b750555130559ae5b2232b6-us7  //replace with server
//list id  :  f899bf0d1a
