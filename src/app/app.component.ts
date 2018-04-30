import { Component, OnDestroy, OnInit } from '@angular/core';

import { TweetState } from './core/state/TweetState';
import { TweetStateUpdates } from './core/state/TweetStateUpdates';
import { Image, Tweet } from './core/models/Models';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  image: Image;
  sentiment: string;
  tweet: Tweet;

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
    this.image = state.image;
    this.sentiment = state.sentiment;
  }
}
