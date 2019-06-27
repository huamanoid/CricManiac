var PORT = process.env.PORT || 8000;
var express = require("express");
var app     = express();
var unirest = require('unirest');
var request = require("request");
app.set("view engine", "ejs");

app.use(express.static(__dirname + '/public'));


var http = require('http');
var server = http.Server(app);


server.listen(PORT, ()=>{
    console.log("listening on port 8000");
})

app.get("/", function(req, res){
    res.render("home");    
})

app.get("/leaderboard",function(req,res){
    unirest.get("https://dev132-cricket-live-scores-v1.p.rapidapi.com/seriesstandings.php?seriesid=2181")
    .header("X-RapidAPI-Host", "dev132-cricket-live-scores-v1.p.rapidapi.com")
    .header("X-RapidAPI-Key", "0e8fa337camsh8b1db3ec644c942p1568e6jsn4b3c9392a451")
    .end(function (result) {
    //console.log(typeof(result.body));
        data = result.body;
    res.render("leaderboard", {data:data})
    });

});

app.get("/live",function(req,res){
    
    var query = req.query.search;
    var url   = "https://dev132-cricket-live-scores-v1.p.rapidapi.com/scorecards.php?seriesid=2181&matchid=" + query;
   
    unirest.get(url)
    .header("X-RapidAPI-Host", "dev132-cricket-live-scores-v1.p.rapidapi.com")
    .header("X-RapidAPI-Key", "0e8fa337camsh8b1db3ec644c942p1568e6jsn4b3c9392a451")
    .end(function (result) {
      //console.log(result.status, result.headers, result.body);
       data = result.body;
    //    console.log(req.query.search);
        
        res.render("live", {data:data});
    });

});


app.get("/matches",function(req,res){
    unirest.get("https://dev132-cricket-live-scores-v1.p.rapidapi.com/matches.php?completedlimit=100&inprogresslimit=100&upcomingLimit=100")
    .header("X-RapidAPI-Host", "dev132-cricket-live-scores-v1.p.rapidapi.com")
    .header("X-RapidAPI-Key", "0e8fa337camsh8b1db3ec644c942p1568e6jsn4b3c9392a451")
    .end(function (result) {
      //console.log(result.status, result.headers, result.body);
       data = result.body
        res.render("matches", {data:data});
    });

});



// var cricapi = require("cricapi");

// cricapi.setAPIKey("lgtEZ6vTfiQ3ToDh3bznIPJxToM2");

// app.get("/matches", function(req,res){
//     cricapi.matches(function(error, databundle){ 
//         var data = JSON.parse(databundle) 
//          //console.log(data);
//          res.render("matches", {data:data});
    
//     });
// })


const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('34bc2160489a4163b981c2ba614fec10');


app.get("/news", function(req,res){
    request('https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=34bc2160489a4163b981c2ba614fec10',
    function(error, response, body){
        var data = JSON.parse(body) 

        if(error){
            console.log("Something went Wrong!")
            console.log(error)
        } else 
            {    
           res.render("news",{data:data})
           }
    })
})






app.get("/about", function(req, res){
    res.render("about");    
})



