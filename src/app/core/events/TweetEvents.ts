import { Injectable } from '@angular/core';
import { AjaxResponse, AjaxError } from 'rxjs/observable/dom/AjaxObservable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/dom/ajax';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import * as Models from '../models/Models';
import { EventSourceUtil } from '../util/EventSourceUtil';
import { TweetUtil } from '../util/TweetUtil';
import { TweetEventsMapper } from '../mappers/TweetEventsMapper';

@Injectable()
export class TweetEvents {

    requests = {
        getSentiment: new Subject<string>(),
        getImage: new Subject<string>()
    };

    responses = {
        getSentimentSuccess: new Subject<string>(),
        getSentimentError: new Subject<Models.Error>(),
        getTweetStreamSuccess: new Subject<Models.Tweet>(),
        getImageSuccess: new Subject<Models.Image>(),
        getImageError: new Subject<Models.Error>()
    };

    constructor(
        private eventSourceUtil: EventSourceUtil,
        private tweetUtil: TweetUtil,
        private tweetEventsMapper: TweetEventsMapper
    ) {
        this.initGetSentiment();
        this.initGetTweetStream();
        this.initGetImage();
    }

    private initGetSentiment(): void {
        this.requests.getSentiment
        .concatMap((search: string) => {
          return this.getSentiment(search)
            .catch((ajax: AjaxError) => {
                this.responses.getSentimentError.next(ajax);
                return Observable.empty();
            })
        })
        .map((ajax: AjaxResponse): Models.Sentiment => {
            return ajax.response.result;
        })
        .subscribe((sentiment: Models.Sentiment) => {
            this.responses.getSentimentSuccess.next(sentiment.sentiment.toLowerCase());
        });
    }

    private initGetTweetStream(): void {
      this.eventSourceUtil.fromEventSource('/tweets')
        .filter(this.tweetUtil.filterUnwantedTweets.bind(this.tweetUtil))
        .throttleTime(10000)
        .map(this.tweetEventsMapper.TwitterTweet_Tweet)
        .subscribe(tweet => {
            this.responses.getTweetStreamSuccess.next(tweet);
        });
    }

    private initGetImage(): void {
      this.requests.getImage
        .concatMap((search: string) => {
          return this.getImage(search)
          .catch((ajax: AjaxError) => {
            this.responses.getImageError.next(ajax);
            return Observable.empty();
          })
        })
        .map((ajax: AjaxResponse): Models.Image => {
          return ajax.response;
        })
        .subscribe((image: Models.Image) => {
          this.responses.getImageSuccess.next(image);
        });
    }

    private getImage(search: string): Observable<AjaxResponse> {
      return Observable.ajax({
        url: `/image?q=${search}`
      });
    }

  private getSentiment(search: string): Observable<AjaxResponse> {
    return Observable.ajax({
      url: '/sentiment',
      body: `txt=${search}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      }
    });
  }
}
