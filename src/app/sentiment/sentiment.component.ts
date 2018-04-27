import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, style, transition, animate, keyframes } from '@angular/animations';

import { TweetEvents } from "../core/events/TweetEvents";
import { TweetState } from "../core/state/TweetState";
import { TweetStateUpdates } from "../core/state/TweetStateUpdates";
import * as Models from '../core/models/Models';

@Component({
  selector: 'sentiment',
  templateUrl: 'sentiment.component.html',
  styleUrls: ['./sentiment.component.css'],
  animations: [
    trigger('pulse', [
      transition('* <=> *', [
        animate(500, keyframes([
          style({transform: 'translateX(0) scale(1)', offset: 0}),
          style({transform: 'translateX(0) scale(1.3)', offset: .6}),
          style({transform: 'translateX(0) scale(1)', offset: 1}),
        ]))
      ])
    ])
  ]
})
export class SentimentComponent implements OnInit, OnDestroy {

  text: string;
  sentiment: Models.Sentiment;

  constructor(
    private tweetEvents: TweetEvents,
    private tweetStateUpdates: TweetStateUpdates
  ) {}

  ngOnInit() {
    this.tweetStateUpdates.subject.subscribe(this.onTweetStateUpdate.bind(this));
  }

  ngOnDestroy() {
    this.tweetStateUpdates.subject.unsubscribe();
  }

  onTweetStateUpdate(state: TweetState) {
    this.sentiment = state.sentiment;
    if (state.tweet && this.text !== state.tweet.text) {
      this.text = state.tweet.text;
      this.tweetEvents.requests.getSentiment.next(this.text);
    }
  }

  setSentimentClass() {
    if (this.sentiment && this.sentiment.sentiment) {
      return "sentiment-" + this.sentiment.sentiment.toLowerCase();
    }
    return "sentiment-neutral";
  }
}
