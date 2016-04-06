'use strict';

function handler () {
   var count = 0;

   this.getCount = function (req, res) {

      count = count + 1;
      console.log(count);
      res.contentType('application/json');
      if(count%2 === 0){
         res.send( '{"notifications" : [{"id":"abc", "priority": 1, "number":' + Math.floor(Math.random()*100) +', "icon":"fa-phone-square" }]}' );
      }else{
         res.send( '{"notifications" : [{"id":"abc", "priority": 1, "number":' + Math.floor(Math.random()*100) +', "icon":"fa-phone-square" }, {"id":"def", "priority": 51, "number":' + Math.floor(Math.random()*100) +', "icon":"fa-envelope-square" }]}' );
      }
   };

}

module.exports = handler;
