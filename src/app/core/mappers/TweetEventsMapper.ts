import { Injectable } from '@angular/core';
import * as Models from '../models/Models';

@Injectable()
export class TweetEventsMapper {

	public TwitterTweet_Tweet = (tweet: Models.TwitterTweet): Models.Tweet => {
    	return {
            id: tweet.id,
            text: tweet.text,
            username: tweet.user.screen_name
        };
    }

}