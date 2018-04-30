import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { trigger, style, transition, animate, keyframes } from '@angular/animations';
import { Sentiment } from '../core/models/Models';

@Component({
  selector: 'sentiment',
  templateUrl: 'sentiment.component.html',
  styleUrls: ['./sentiment.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
export class SentimentComponent {
  @Input() sentiment: Sentiment;

  setSentimentClass() {
    if (this.sentiment) {
      return 'sentiment-' + this.sentiment;
    }
    return 'sentiment-neutral';
  }
}
