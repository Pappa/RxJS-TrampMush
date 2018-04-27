import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
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
    private zone: NgZone,
    private tweetStateUpdates: TweetStateUpdates
  ) {}

  ngOnInit() {
    this.tweetStateUpdates.subject.subscribe(this.onTweetStateUpdate.bind(this));
  }

  ngOnDestroy() {
    this.tweetStateUpdates.subject.unsubscribe();
  }

  onTweetStateUpdate(state: TweetState) {
    // TODO: investigate NgZone workaround.
    // Should this be required, or is Angular
    // ignoring async events from an EventSource?
    this.zone.run(() => {
      this.tweet = state.tweet;
    });
  }
}
