var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var monk = require('monk');
var arrayex = require("array-extended");

var tavernDB = monk('localhost:27017/tavern');


function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

/* GET home page. */
router.get('/shortages', function(req, res, next) {
  var roll = randomIntFromInterval(1,100);
  var db = tavernDB;
  
  var shortagesCollection = db.get('shortages');
  
  var shortages = function(data){
    /**********************
    What are they out of?
    *********************/
    var count = 1;
    roll = randomIntFromInterval(1,100);
    while(roll >= 86){
      if(roll>=96) count = count * 3;
      else count = count*2;
      roll = randomIntFromInterval(1,100);
    }
    
    var multipleShortages = function(combineResults){
      for(var i = 0; i<count; i++){
        
        if(count == 1) roll = randomIntFromInterval(1,85);
        else roll = randomIntFromInterval(1,75);
        
        shortagesCollection.find({$and:[{"start":{$lte:roll}},{"end":{$gte:roll}}]},
          {},
          function(e,docs){
      
            combineResults(docs[0].shortage, count);
            
        });
      }
    }
    var shortageArray = [];
    multipleShortages(function(result, count)
    {
      shortageArray.push(result);
      if(shortageArray.length == count)
      {
        data("shortages",shortageArray);
      }
    });
  }

  var tavern = {};

  tavern.shortages = [];

  shortages(function(category, data){
    
    tavern.shortages = data;
    

    if(tavern.shortages.length > 0)
    {
      res.jsonp(tavern);
    }
    
  });
});

router.get('/', function(req, res, next) {
  //req.db = tavernDB;
  //var roll = randomIntFromInterval(1,100);
  var db = tavernDB;
  var namesCollection = db.get('names');
  var clienteleCollection = db.get('clientele');
  var shortageCollection = db.get('shortages');
  var accomodationsCollection = db.get("accomodations");
  var atmosphereCollection = db.get("atmosphere");
  var attitudesCollection = db.get("attitudes");
  var drinksCollection = db.get("drinks");
  var entertainmentCollection = db.get("entertainment");
  var facilitiesCollection = db.get("facilities");
  var gamesCollection = db.get("games");
  var misfortunesCollection = db.get("misfortunes");
  var mysteryCollection = db.get("mystery");
  var unwelcomeCollection = db.get("unwelcome");


  var tavernName = function(data){

    /*************
    What is the tavern called?
    ************/
    var nameroll = randomIntFromInterval(1,100);
    namesCollection.find({$or:[{"start":nameroll},{"end":nameroll}]}, {} ,function(e,docs){
      var first = docs[0].first;
      data("first",first);
    });
    nameroll = randomIntFromInterval(1,100);
    namesCollection.find({$or:[{"start":nameroll},{"end":nameroll}]}, {} ,function(e,docs){
      var second = docs[0].second;
      data("second",second);
    });

    /******************
    Who frequents the tavern?
    ******************/
    var clienteleCount = 1;
    var clienteleroll = randomIntFromInterval(1,100);
    while(clienteleroll >= 93){
      clienteleCount = clienteleCount*2;
      clienteleroll = randomIntFromInterval(1,100);
    }

    var multipleClientele = function(combineResults){
      for(var i = 0; i<clienteleCount; i++){
        clienteleroll = randomIntFromInterval(1,92);

        clienteleCollection.find({$and:[{"start":{$lte:clienteleroll}},{"end":{$gte:clienteleroll}}]},
          {},
          function(e,docs){
            combineResults(docs[0].clientele,clienteleCount);
            //data("clientele",docs[0].clientele, completeclienteleCount);
        });
      }
    }
    var clienteleArray = [];
    multipleClientele(function(result, clienteleCount)
    {
      clienteleArray.push(result);
      if(clienteleArray.length == clienteleCount)
      {
        data("clientele",clienteleArray);
      }
    });

    /**********************
    What are they out of?
    *********************/
    var shortageCount = 1;
    var shortageroll = randomIntFromInterval(1,100);
    while(shortageroll >= 86){
      if(shortageroll>=96) shortageCount = shortageCount * 3;
      else shortageCount = shortageCount*2;
      shortageroll = randomIntFromInterval(1,100);
    }
    
    var multipleShortages = function(combineResults){
      for(var i = 0; i<shortageCount; i++){
        
        if(shortageCount == 1) shortageroll = randomIntFromInterval(1,85);
        else shortageroll = randomIntFromInterval(1,75);
        
        shortageCollection.find({$and:[{"start":{$lte:shortageroll}},{"end":{$gte:shortageroll}}]},
          {},
          function(e,docs){
      
            combineResults(docs[0].shortage, shortageCount);
            
        });
      }
    }
    var shortageArray = [];
    multipleShortages(function(result, shortageCount)
    {
      shortageArray.push(result);
      if(shortageArray.length == shortageCount)
      {
        data("shortages",shortageArray);
      }
    });


    /**********************
    What is the barkeep's attitude?
    *********************/
    var attitudesroll = randomIntFromInterval(1,100);
    attitudesCollection.find({$and:[{"start":{$lte:attitudesroll}},{"end":{$gte:attitudesroll}}]}, {} ,function(e,docs){
      var attitude = docs[0].attitude;
      data("attitude",attitude);
    });

    /**********************
    Who is the mysterious person drinking in the corner?
    *********************/
    var mysteryroll = randomIntFromInterval(1,100);
    mysteryCollection.find({$and:[{"start":{$lte:mysteryroll}},{"end":{$gte:mysteryroll}}]}, {} ,function(e,docs){
      var mystery = docs[0].identity;
      data("mystery",mystery);
    });

    /**********************
    What are the facilities like?
    *********************/
    var facilityroll = randomIntFromInterval(1,100);
    facilitiesCollection.find({$and:[{"start":{$lte:facilityroll}},{"end":{$gte:facilityroll}}]}, {} ,function(e,docs){
      var facility = docs[0].facility;
      data("facility",facility);
    });

    /**********************
    How clean are the facilities?
    *********************/
    var cleanlinessroll = randomIntFromInterval(1,100);
    facilitiesCollection.find({$and:[{"start":{$lte:cleanlinessroll}},{"end":{$gte:cleanlinessroll}}]}, {} ,function(e,docs){
      var cleanliness = docs[0].cleanliness;
      data("cleanliness",cleanliness);
    });
    
    /**********************
    What games are there?
    *********************/
    var gamesroll = randomIntFromInterval(1,100);
    gamesCollection.find({$and:[{"start":{$lte:gamesroll}},{"end":{$gte:gamesroll}}]}, {} ,function(e,docs){
      var game = docs[0].game;
      data("game",game);
    });

    /**********************
    What's playing?
    *********************/
    var entertainmentroll = randomIntFromInterval(1,100);
    entertainmentCollection.find({$and:[{"start":{$lte:entertainmentroll}},{"end":{$gte:entertainmentroll}}]}, {} ,function(e,docs){
      var entertainment = docs[0].entertainment;
      data("entertainment",entertainment);
    });

    /**********************
    Do they suck??
    *********************/
    var qualityroll = randomIntFromInterval(1,100);
    entertainmentCollection.find({$and:[{"start":{$lte:qualityroll}},{"end":{$gte:qualityroll}}]}, {} ,function(e,docs){
      var quality = docs[0].quality;
      data("quality",quality);
    });

    /**********************
    What bad thing happens to drunk people?
    *********************/
    var misfortuneCount = 1;
    var misfortuneroll = randomIntFromInterval(1,100);
    while(misfortuneroll >= 91){
      misfortuneCount = misfortuneCount*2;
      misfortuneroll = randomIntFromInterval(1,100);
    }
    
    var multipleMisfortunes = function(combineResults){
      for(var i = 0; i<misfortuneCount; i++){
        
        misfortuneroll = randomIntFromInterval(1,90);
        
        
        misfortunesCollection.find({$and:[{"start":{$lte:misfortuneroll}},{"end":{$gte:misfortuneroll}}]},
          {},
          function(e,docs){
      
            combineResults(docs[0].misfortune, misfortuneCount);
            
        });
      }
    }
    var misfortuneArray = [];
    multipleMisfortunes(function(result, misfortuneCount)
    {
      misfortuneArray.push(result);
      if(misfortuneArray.length == misfortuneCount)
      {
        data("misfortunes",misfortuneArray);
      }
    });

    /*************
    What is the house drink called?
    ************/
    var drinkroll = randomIntFromInterval(1,100);
    drinksCollection.find({$and:[{"start":{$lte:drinkroll}},{"end":{$gte:drinkroll}}]}, {} ,function(e,docs){
      var first = docs[0].first;
      data("drinkfirst",first);
    });
    var drinksecondroll = randomIntFromInterval(1,100);
    drinksCollection.find({$and:[{"start":{$lte:drinksecondroll}},{"end":{$gte:drinksecondroll}}]}, {} ,function(e,docs){
      var second = docs[0].second;
      data("drinksecond",second);
    });

    /**********************
    What's the atmosphere like?
    *********************/
    var atmosphereroll = randomIntFromInterval(1,100);
    atmosphereCollection.find({$and:[{"start":{$lte:atmosphereroll}},{"end":{$gte:atmosphereroll}}]}, {} ,function(e,docs){
      var atmosphere = docs[0].atmosphere;
      data("atmosphere",atmosphere);
    });

    /**********************
    What rooms are available?
    *********************/
    var roomroll = randomIntFromInterval(1,100);
    accomodationsCollection.find({$and:[{"start":{$lte:roomroll}},{"end":{$gte:roomroll}}]}, {} ,function(e,docs){
      var room = docs[0].room;
      data("room",room);
    });

    /**********************
    What are we sleeping on?
    *********************/
    var accomodationsroll = randomIntFromInterval(1,100);
    accomodationsCollection.find({$and:[{"start":{$lte:accomodationsroll}},{"end":{$gte:accomodationsroll}}]}, {} ,function(e,docs){
      var accomodations = docs[0].accomodations;
      data("accomodations",accomodations);
    });

    /**********************
    We don't take kindly to your type round here
    *********************/
    var unwelcomeroll = randomIntFromInterval(1,100);
    unwelcomeCollection.find({$and:[{"start":{$lte:unwelcomeroll}},{"end":{$gte:unwelcomeroll}}]}, {} ,function(e,docs){
      var unwelcome = docs[0].unwelcome;
      data("unwelcome",unwelcome);
    });
  }

  var namesString = "";
  var drinkString = "";
  var tavern = {};
  var doneObjects = {};
  tavern.clientele = [];
  tavern.shortages = [];
  tavern.misfortunes = [];

  tavernName(function(category, data){
    if(category == "first")
    {
      namesString = data;
      
    }
    else if(category == "second")
    {
      namesString+=" "+data;
      tavern.name = namesString;
      
    }
    else if(category == "clientele"){
      tavern.clientele= arrayex.unique(data);
    }
    else if(category == "shortages")
    {
      tavern.shortages = arrayex.unique(data);
    }
    else if(category == "attitude")
    {
      tavern.attitude = data;
    }
    else if(category == "mystery")
    {
      tavern.mystery = data;
    }
    else if(category == "facility")
    {
      tavern.facility = data;
    }
    else if(category == "cleanliness")
    {
      tavern.cleanliness = data;
    }
    else if(category == "game")
    {
      tavern.game = data;
    }
    else if(category == "misfortunes")
    {
      tavern.misfortunes = arrayex.unique(data);
    }
    else if(category == "drinkfirst")
    {
      drinkString = data;
    }
    else if(category == "drinksecond")
    {
      drinkString+=" "+data;
      tavern.drink = drinkString;
    }
    else if(category == "atmosphere")
    {
      tavern.atmosphere = data;
    }
    else if(category == "room")
    {
      tavern.room = data;
    }
    else if(category == "accomodations")
    {
      tavern.accomodations = data;
    }
    else if(category == "unwelcome")
    {
      tavern.unwelcome = data;
    }
    else if(category == "entertainment")
    {
      tavern.entertainment = data;
    }
    else if(category == "quality")
    {
      tavern.quality = data;
    }

    if(tavern.name && tavern.entertainment && tavern.quality && tavern.clientele.length > 0 && tavern.shortages.length > 0 && tavern.misfortunes.length > 0&& tavern.unwelcome && tavern.room && tavern.accomodations && tavern.atmosphere && tavern.drink && tavern.attitude && tavern.mystery && tavern.facility && tavern.cleanliness && tavern.game) 
    {
      res.jsonp(tavern);
    }
    
  });
  
  

});

module.exports = router;