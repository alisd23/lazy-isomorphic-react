
const path = require('path');
const express = require('express');
const _products = require('./products.json');

module.exports = (PORT) => {

  const app = express();

  /**
   *  Routes
   */

  app.get('/', function(req, res) {
    res.sendFile(path.normalize(__dirname + '/../index.html'));
  });
  app.get('/products', function(req, res) {
    console.log("Getting products");
    res.status(200).send(_products);
  })

  /**
   *  Middleware
   */

  // Serve build folder
  app.use(express.static('../build'));

  /**
   *  Start server listening
   */

  app.listen(PORT, function(error) {
    if (error) {
      console.error(error);
    } else {
      console.info('==> 🌎 Backend server listening on port %s.', PORT);
    }
  });

};
