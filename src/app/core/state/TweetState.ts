import { Injectable } from '@angular/core';
import { Error, Image, Sentiment, Tweet } from '../models/Models';

@Injectable()
export class TweetState {

    tweet: Tweet;
    sentiment: Sentiment;
    error: Error;
    image: Image;

    public setTweet(tweet: Tweet): void {
        this.tweet = tweet;
    }

    public setSentiment(sentiment: Sentiment): void {
        this.sentiment = sentiment;
    }

    public setError(error: Error): void {
        this.error = error;
    }

  public setImage(image: Image): void {
    this.image = image;
  }

}
