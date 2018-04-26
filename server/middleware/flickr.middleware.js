const request = require('request');

class Flickr {

	constructor() {
		this.REST_API = 'https://api.flickr.com/services/rest/';
		this.API_KEY = process.env.FLICKR_API_KEY;
		this.METHOD = 'flickr.photos.search';
		this.OPTIONS = '&format=json&per_page=1&media=photos&extras=url_q&nojsoncallback=1';
	}

	getImage(req, res, next) {
	    let q = encodeURI(req.query.q);
	    let url = `${this.REST_API}?method=${this.METHOD}&api_key=${this.API_KEY}&text=${q}${this.OPTIONS}`;

	    request.get(url, (error, response, body) => {
	      console.log(error, response, body);
	      if (error) {
	        next(error);
        }
	    	let flickerResponse = JSON.parse(response.body);
	    	let url = (flickerResponse.photos.photo[0] && flickerResponse.photos.photo[0].url_q) ? flickerResponse.photos.photo[0].url_q : null;
	    	let result = {
	    		url: url
	    	};
			res.write(JSON.stringify(result));
			res.end();
	    });
	}

}

module.exports = Flickr;
