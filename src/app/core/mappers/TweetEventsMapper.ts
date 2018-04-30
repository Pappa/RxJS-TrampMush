import { Injectable } from '@angular/core';
import * as Models from '../models/Models';
import { TweetUtil } from '../util/TweetUtil';

@Injectable()
export class TweetEventsMapper {

  constructor(
    private tweetUtil: TweetUtil
  ) {
  }

	public TwitterTweet_Tweet = (tweet: Models.TwitterTweet): Models.Tweet => {
    	return {
          id: tweet.id,
          text: tweet.text,
          username: tweet.user.screen_name,
          trimmed: this.tweetUtil.trimTweetText(tweet.text)
        };
    }

}
