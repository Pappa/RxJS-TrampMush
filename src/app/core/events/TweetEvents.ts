import { Injectable } from '@angular/core';
import { AjaxResponse, AjaxError } from 'rxjs/observable/dom/AjaxObservable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/dom/ajax';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import { Subscriber } from 'rxjs/Subscriber';
import * as Models from '../models/Models';
import { EventSourceUtil } from '../util/EventSourceUtil';
import { TweetUtil } from '../util/TweetUtil';
import { TweetEventsMapper } from '../mappers/TweetEventsMapper';

@Injectable()
export class TweetEvents {

    actions = {
        clickPicture: new Subject<void>()
    }

    requests = {
        getSentiment: new Subject<string>()
    }

    responses = {
        getSentimentSuccess: new Subject<Models.Sentiment>(),
        getSentimentError: new Subject<Models.Error>(),
        getTweetStreamSuccess: new Subject<Models.Tweet>()
    }

    constructor(
        private eventSourceUtil: EventSourceUtil,
        private tweetUtil: TweetUtil,
        private tweetEventsMapper: TweetEventsMapper
    ) { 
        this.initGetSentiment();
        this.initGetTweetStream();
    }

    private initGetSentiment(): void {
        this.requests.getSentiment
        .concatMap((search: string) => {
            return Observable.ajax({
                url: '/sentiment',
                body: `txt=${search}`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                }
            })
            .catch((ajax: AjaxError) => {
                this.responses.getSentimentError.next(ajax);
                return Observable.empty();
            })
        })
        .map((ajax: AjaxResponse): Models.Sentiment => {
            return ajax.response.result;
        })
        .subscribe((sentiment: Models.Sentiment) => {
            this.responses.getSentimentSuccess.next(sentiment);
        });
    }

    private initGetTweetStream(): void {
        this.eventSourceUtil.fromEventSource('/tweets')
        .filter(this.tweetUtil.filterUnwantedTweets)
        .throttleTime(10000)
        .map(this.tweetEventsMapper.TwitterTweet_Tweet)
        .subscribe(tweet => {
            this.responses.getTweetStreamSuccess.next(tweet);
        });
    }
}