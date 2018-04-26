import { Injectable } from '@angular/core';
import * as Models from '../models/Models';

@Injectable()
export class TweetUtil {

    private readonly MIN_WORD_LENGTH = 3;
    private readonly FILTER_REGEXP = [/@[a-z0-9_]+/gi, /http[^ ]+/g, /…/g, /&amp;/g, /\n/, /\r/];
    private readonly SPLIT_REGEXP = /[ .!?#:",/()]/;

	public filterUnwantedTweets = (tweet: Models.Tweet): boolean => {
    	if (!tweet || !tweet.text) {
    		return false;
    	}
        if (tweet.text.startsWith('RT ')) {
            return false;
        }
		const MIN_TWEET_SIZE = 10;
		let trimmedTweetText = this.trimTweetText(tweet.text);
		return trimmedTweetText.length >= MIN_TWEET_SIZE;
    }

    public trimTweetText = (text: string): string => {
    	if (!text) {
    		return '';
    	}
        let stripped = this.FILTER_REGEXP
            .reduce((acc, regex) => {
                return acc.replace(regex, '');
            }, text);
		return this.selectWords(stripped);
	}

    private selectWords = (text: string): string => {
        return text.split(this.SPLIT_REGEXP)
            .filter(word => word.length >= this.MIN_WORD_LENGTH)
            .sort((a, b) => b.length - a.length)
            .slice(0, 3)
            .join(' ');
    }

}