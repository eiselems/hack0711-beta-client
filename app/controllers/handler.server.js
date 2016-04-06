'use strict';

function handler () {
   
   this.getCount = function (req, res) {

      res.contentType('application/json');
      if(Math.random() > 0.5){
         res.send( '{"notifications" : [{"id":"abc", "priority": 1, "number":' + Math.floor(Math.random()*100) +', "icon":"fa-phone-square" }]}' );
      }else{
         res.send( '{"notifications" : [{"id":"abc", "priority": 1, "number":' + Math.floor(Math.random()*100) +', "icon":"fa-phone-square" }, {"id":"def", "priority": 51, "number":' + Math.floor(Math.random()*100) +', "icon":"fa-envelope-square" }]}' );
      }
   };

}

module.exports = handler;
