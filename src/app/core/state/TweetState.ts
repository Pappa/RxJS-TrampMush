import { Injectable } from '@angular/core';
import * as Models from '../models/Models';
import { TweetUtil } from "../util/TweetUtil";

@Injectable()
export class TweetState {

    tweet: Models.Tweet;
    sentiment: Models.Sentiment;
    error: Models.Error;
    trimmedTweetText: string;

    constructor(
        private tweetUtil: TweetUtil
    ) {
    }

    public setTweet(tweet: Models.Tweet): void {
        this.tweet = tweet;
        this.trimmedTweetText = this.tweetUtil.trimTweetText(tweet.text);
    }

    public setSentiment(sentiment: Models.Sentiment): void {
        this.sentiment = sentiment;
    }

    public setError(error: Models.Error): void {
        this.error = error;
    }

}