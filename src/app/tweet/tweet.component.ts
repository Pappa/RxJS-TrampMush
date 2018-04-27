import { Component, Input } from '@angular/core';
import { Tweet } from '../core/models/Models';

@Component({
  selector: 'tweet',
  templateUrl: 'tweet.component.html',
  styleUrls: ['./tweet.component.css']
})
export class TweetComponent {
  @Input() tweet: Tweet;
}
