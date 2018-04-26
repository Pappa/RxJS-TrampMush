import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {TweetState} from "./TweetState";
import {TweetEvents} from "../events/TweetEvents";
import * as Models from "../models/Models";

@Injectable()
export class TweetStateUpdates {

    public subject: BehaviorSubject<TweetState>;

    constructor(
        private tweetState: TweetState,
        private tweetEvents: TweetEvents
    ) {

        this.subject = new BehaviorSubject(tweetState);

        this.tweetEvents.responses.getSentimentSuccess
            .subscribe((sentiment: Models.Sentiment) => {
                this.tweetState.setSentiment(sentiment);
                this.subject.next(this.tweetState);
            });

        this.tweetEvents.responses.getSentimentError
            .subscribe((error: Models.Error) => {
                this.tweetState.setSentiment(null);
                this.tweetState.setError(error);
                this.subject.next(this.tweetState);
            });

        this.tweetEvents.responses.getTweetStreamSuccess
            .subscribe((tweet) => {
                this.tweetState.setTweet(tweet);
                this.subject.next(this.tweetState);
            });

    }
}