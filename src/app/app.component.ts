import { Component, OnDestroy, OnInit } from '@angular/core';

import { TweetEvents } from './core/events/TweetEvents';
import { TweetState } from './core/state/TweetState';
import { TweetStateUpdates } from './core/state/TweetStateUpdates';
import { Image, Tweet } from './core/models/Models';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  text: string;
  trimmedTweetText: string;
  image: Image;
  sentiment: string;
  tweet: Tweet;

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
    this.tweet = state.tweet;
    this.image = state.image;
    this.sentiment = state.sentiment;
    if (state.trimmedTweetText && this.trimmedTweetText !== state.trimmedTweetText) {
      this.trimmedTweetText = state.trimmedTweetText;
      this.tweetEvents.requests.getImage.next(this.trimmedTweetText);
    }
    if (state.tweet && this.text !== state.tweet.text) {
      this.text = state.tweet.text;
      this.tweetEvents.requests.getSentiment.next(state.tweet.text);
    }
  }
}
