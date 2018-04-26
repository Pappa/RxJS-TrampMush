const request = require('request');

class Sentiments {

  getSentiment(req, res, next) {
    var options = {
      url: 'https://community-sentiment.p.mashape.com/text/',
      headers: {
        'X-Mashape-Key': process.env.MASHAPE_API_KEY,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      body: `txt=${req.body.txt}`
    };

    request.post(options, (error, response, body) => {
      if (error) {
        next(error);
      }
      res.write(body);
      res.end();
    });

  }

}

module.exports = Sentiments;
