const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const knex = require('./knex.js');

// console.log(knex);

app.get('/',function(req,res,next){
  // res.send(
    knex('fears')
      .join('hero_fears','fears.id','=','hero_fears.fears_id')
      .join('hero','hero.id','=','hero_fears.hero_id')
      .select('hero.name','fears.type')
      .where('fears.type','=','water')
      .orWhere('fears.type','=','light')
      .orWhere('fears.type','=','air')
      .orWhere('fears.type','=','dark')
      .orWhere('fears.type','=','flying')
      .then((result) => {
        res.send(result);
        knex.destroy();
      })
      .catch((err) => {
        console.error(err);
        knex.destroy();
        process.exit(1);
      });
  // );
});

app.listen(3000, function(){
  console.log("listening on port",port);
});
