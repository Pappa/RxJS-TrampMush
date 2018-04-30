import { Injectable } from '@angular/core';
import { Error, Image, Tweet } from '../models/Models';
import { TweetUtil } from '../util/TweetUtil';

@Injectable()
export class TweetState {

    tweet: Tweet;
    sentiment: string;
    error: Error;
    trimmedTweetText: string;
    image: Image;

    constructor(
        private tweetUtil: TweetUtil
    ) {
    }

    public setTweet(tweet: Tweet): void {
        this.tweet = tweet;
        this.trimmedTweetText = this.tweetUtil.trimTweetText(tweet.text);
    }

    public setSentiment(sentiment: string): void {
        this.sentiment = sentiment;
    }

    public setError(error: Error): void {
        this.error = error;
    }

  public setImage(image: Image): void {
    this.image = image;
  }

}
