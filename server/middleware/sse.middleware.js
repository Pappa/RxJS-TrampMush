const express = require('express');
const ServerConfig = require('../config/server.config');
const ApiConfig = require('../config/api.config');
const EventEmitter = require('events');
const TwitterApi = require('../modules/twitterApi');

class ServerSentEvents extends EventEmitter {

  constructor() {
    super();
    return this;
  }

	getTweetStream(req, res, next) {

    req.socket.setTimeout(1000 * 60 * 60);

    res.writeHead(200, ServerConfig.SSE_HEADERS);
    res.write('\n');

    this.connectToStream(res);
	}

  sendEvent(res, tweet) {
    res.write('event: message\n');
    res.write(`data: ${JSON.stringify(tweet)}\n\n`);
  }

  connectToStream(res) {
    this.twitterApi = new TwitterApi();
    this.twitterApi.connectToStream(
      ApiConfig.TWITTER_STREAM_URL, 
      ApiConfig.TWITTER_SEARCH_OPTIONS
    );
    //this.twitterApi.on('error', this.twitterApi.disconnect.bind(this.twitterApi));
    this.twitterApi.on('error', console.log.bind(console, "error"));
    this.twitterApi.on('tweet', this.sendEvent.bind(this, res));
  }

}

module.exports = ServerSentEvents;