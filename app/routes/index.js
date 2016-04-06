'use strict';

var Handler = require(process.cwd() + '/app/controllers/handler.server.js');

module.exports = function (app) {
   var handler = new Handler();

   app.route('/')
      .get(function (req, res) {
         res.sendFile(process.cwd() + '/public/index-dev.html');
      });

   app.route('/api/data')
      .get(handler.getCount)
      //.post(handler.addClick)
      //.delete(handler.resetClicks);
};
