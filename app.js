const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');


const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/signup.html');
});




app.post('/', function(req, res) {
  console.log(req.body.firstname);
  console.log(req.body.lastname);
  console.log(req.body.email);
  const data = {
    members: [{
      "email_address": (req.body.email),
      "status": "subscribed",
      "merge_fields": {
        "FNAME": req.body.firstname,
        "LNAME": req.body.lastname,
        "MMERGE6":req.body.password
      }
    }]


  };
  const jsonData = JSON.stringify(data);

  const url = "https://us10.api.mailchimp.com/3.0/lists/cb342fe6ac"
  const options = {
    method: "POST",
    auth: "siddharth101:1fb6b90bc313b8f6e3ce8be3934cf26f-us10"
  }

  const request = https.request(url, options, function(response) {

    if (response.statusCode === 200) {
      res.sendFile(__dirname + '/success.html');
    } else {
      res.sendFile(__dirname + '/fail.html')
    }


    response.on("data", function(data) {
      console.log(JSON.parse(data));
    });

  });
  request.write(jsonData);
  request.end();
});


app.post('/failure',function(req,res){
  res.redirect("/")
})


// apiKey
// 1fb6b90bc313b8f6e3ce8be3934cf26f-us10
// api id
// cb342fe6ac
app.listen(process.env.PORT||3000, function() {
  console.log("server started at 3000");
});
