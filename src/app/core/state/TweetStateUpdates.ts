import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {TweetState} from './TweetState';
import {TweetEvents} from '../events/TweetEvents';

@Injectable()
export class TweetStateUpdates {

    public subject: BehaviorSubject<TweetState>;

    constructor(
        private tweetState: TweetState,
        private tweetEvents: TweetEvents
    ) {

        this.subject = new BehaviorSubject(tweetState);

        this.tweetEvents.responses.getTweetStreamSuccess
            .subscribe(({ tweet, image, sentiment }) => {
              this.tweetState.setTweet(tweet);
              this.tweetState.setImage(image);
              this.tweetState.setSentiment(sentiment.sentiment.toLowerCase());
              this.subject.next(this.tweetState);
            });

    }
}
