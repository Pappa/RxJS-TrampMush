import { Component, OnDestroy, OnInit } from '@angular/core';

import { ImageEvents } from './core/events/ImageEvents';
import { TweetEvents } from './core/events/TweetEvents';
import { TweetState } from './core/state/TweetState';
import { ImageState } from './core/state/ImageState';
import { TweetStateUpdates } from './core/state/TweetStateUpdates';
import { ImageStateUpdates } from './core/state/ImageStateUpdates';
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
    private imageEvents: ImageEvents,
    private tweetEvents: TweetEvents,
    private tweetStateUpdates: TweetStateUpdates,
    private imageStateUpdates: ImageStateUpdates
  ) {}

  ngOnInit() {
    this.tweetStateUpdates.subject.subscribe(this.onTweetStateUpdate.bind(this));
    this.imageStateUpdates.subject.subscribe(this.onImageStateUpdate.bind(this));
  }

  ngOnDestroy() {
    this.tweetStateUpdates.subject.unsubscribe();
    this.imageStateUpdates.subject.unsubscribe();
  }

  onTweetStateUpdate(state: TweetState) {
    this.tweet = state.tweet;
    if (state.trimmedTweetText && this.trimmedTweetText !== state.trimmedTweetText) {
      this.trimmedTweetText = state.trimmedTweetText;
      this.imageEvents.requests.getImage.next(this.trimmedTweetText);
    }
    this.sentiment = state.sentiment;
    console.log(this.sentiment);
    if (state.tweet && this.text !== state.tweet.text) {
      this.text = state.tweet.text;
      this.tweetEvents.requests.getSentiment.next(state.tweet.text);
    }
  }

  onImageStateUpdate(state: ImageState) {
    this.image = state.image;
  }
}
