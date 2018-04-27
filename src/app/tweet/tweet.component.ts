import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Models from '../core/models/Models';

import { TweetState } from "../core/state/TweetState";
import { TweetStateUpdates } from "../core/state/TweetStateUpdates";

@Component({
  selector: 'tweet',
  templateUrl: 'tweet.component.html',
  styleUrls: ['./tweet.component.css']
})
export class TweetComponent implements OnInit, OnDestroy {

  tweet: Models.Tweet;

  constructor(
    private tweetStateUpdates: TweetStateUpdates
  ) {}

  ngOnInit() {
    this.tweetStateUpdates.subject.subscribe(this.onTweetStateUpdate.bind(this));
  }

  ngOnDestroy() {
    this.tweetStateUpdates.subject.unsubscribe();
  }

  onTweetStateUpdate(state: TweetState) {
    this.tweet = state.tweet;
  }
}
