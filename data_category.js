var Product = require("./models/Category");
  var express = require('express');
  const { MONGOURI } = require("./config/keys");
  
  var mongoose=require("mongoose");
  mongoose.connect(MONGOURI,{ useNewUrlParser: true , useUnifiedTopology: true  } );
  const db = mongoose.connection
  db.on('error', error => console.error(error))
  db.once('open', () => console.log('Connected to Mongoose_db'));
  
  var categories = [
      new Category({
        name:"Food"
    }),
    new Category({
        name:"Lifestyle"
    }),
    new Category({
        name:"Adventure"
    }),
    new Category({
        name:"Travel"
    }),
  ];
  
  var done=0;
  for(var i=0;i<categories.length;i++){
      categories[i].save(function(err,result){
          done++;
          if(done===categories.length){
              exit();
          }
      });
  }
  function exit(){
      mongoose.disconnect();
  }
  