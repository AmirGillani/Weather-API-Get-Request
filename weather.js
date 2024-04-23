var express = require("express");

//built-in node js module to fetch data using get requests
var https = require("https");

var app = express();

app.listen(3000, function () { console.log("Server Is Running On Port 3000"); });

var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {

    res.sendFile(__dirname +"/index.html");
   
});    

app.post("/", function(req,res){

    const country= req.body.country;
    const unit="metric";
    const key="faa1883bd6d5faa6192689b8d24a0e5b";
    const url = "https://api.openweathermap.org/data/2.5/weather?appid="+ key +"&q="+country +"&units="+unit;
    //built-in function to call api
    https.get(url, function (response) {

        //fetch responce of data
        response.on("data", function (data) {

            //view fetched data in HEXA DECIMAL form in terminal
            console.log(data);

            //convert jason to js object
            const weather = JSON.parse(data);

            //use json viewer to copy path of elements you want to fetch

            const temp = weather.main.temp;

            const icon = weather.weather[0].icon;

            var imgUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

            const des = weather.weather[0].description;

            res.write("<h1>Current Weather in"+ country +" is " + temp + " C</h1>");

            res.write("<h3> " + des + "</h3>");

            res.write("<img  src=" + imgUrl + ">");

            res.send();
        });

    });
})
