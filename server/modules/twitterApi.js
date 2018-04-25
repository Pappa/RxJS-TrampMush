const Twitter = require('twitter');
const EventEmitter = require('events');

class TwitterApi extends EventEmitter {

	constructor() {
		super();
		this.client = new Twitter({
			consumer_key: process.env.TWITTER_CONSUMER_KEY,
			consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
			access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
			access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
		});
		return this;
	}

	connectToStream(path, params) {
		this.client.stream(path, params, (stream) => {
			this.stream = stream;
			this.stream.on('data', this.emit.bind(this, 'tweet'));
			this.stream.on('error', this.emit.bind(this, 'error'));
		});
	}

	disconnect() {
		this.stream.destroy();
	}

}

module.exports = TwitterApi;