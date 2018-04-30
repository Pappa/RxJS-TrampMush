import { Injectable } from '@angular/core';
import { AjaxResponse, AjaxError } from 'rxjs/observable/dom/AjaxObservable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/dom/ajax';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/forkJoin';
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

    responses = {
        getTweetStreamSuccess: new Subject<Models.CombinedResponse>()
    };

    constructor(
        private eventSourceUtil: EventSourceUtil,
        private tweetUtil: TweetUtil,
        private tweetEventsMapper: TweetEventsMapper
    ) {
        this.initGetTweetStream();
    }

    private initGetTweetStream(): void {
      this.eventSourceUtil.fromEventSource('/tweets')
        .filter(this.tweetUtil.filterUnwantedTweets.bind(this.tweetUtil))
        .throttleTime(10000)
        .map(this.tweetEventsMapper.TwitterTweet_Tweet)
        .switchMap(tweet => {
          return Observable.forkJoin(
            Observable.of(tweet),
            this.getImage(tweet.trimmed),
            this.getSentiment(tweet.text)
          );
        })
        .subscribe(([tweet, image, sentiment]) => {
            this.responses.getTweetStreamSuccess.next({ tweet, image, sentiment });
        });
    }

    private getImage(search: string): Observable<Models.Image> {
      return Observable.ajax({
        url: `/image?q=${search}`
      })
      .map((ajax: AjaxResponse): Models.Image => {
        return ajax.response;
      });
    }

  private getSentiment(search: string): Observable<Models.Sentiment> {
    return Observable.ajax({
      url: '/sentiment',
      body: `txt=${search}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      }
    })
    .map((ajax: AjaxResponse): Models.Sentiment => {
      return ajax.response.result;
    });
  }
}
