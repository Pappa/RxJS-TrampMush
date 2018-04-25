const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const express = require('express');
const path = require('path');
const ServerSentEvents = require('./middleware/sse.middleware');
const Sentiments = require('./middleware/sentiments.middleware');
const Flickr = require('./middleware/flickr.middleware');
const dotenv = require('dotenv');

class Server {

  constructor() {
    this.app = express();
    this.sse = new ServerSentEvents();
    this.sentiments = new Sentiments();
    this.flickr = new Flickr();

    this.config();
    this.routes();
    this.api();
  }

  static bootstrap() {
    dotenv.config();
    return new Server();
  }

  api() {
    // Tweets SSE endpoint
    this.app.get('/tweets', this.sse.getTweetStream);
    // Sentiment
    this.app.post('/sentiment', this.sentiments.getSentiment);
    // Image
    this.app.get('/image', this.flickr.getImage);
  }

  config() {
    // static paths
    this.app.use(express.static(path.join(__dirname, "../client")));
    this.app.use("/node_modules", express.static(path.join(__dirname, "../../node_modules")));

    // middleware
    this.app.use(bodyParser.json());
    this.app.use(methodOverride());
    this.app.use(bodyParser.urlencoded({
      extended: true
    }));

    // 404
    this.app.use((err, req, res, next) => {
        err.status = 404;
        next(err);
    });
  }

  routes() {
    let router = express.Router();
    this.app.use(router);
  }

}

module.exports = Server;