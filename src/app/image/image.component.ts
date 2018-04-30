import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Image } from '../core/models/Models';

@Component({
  selector: 'image',
  templateUrl: 'image.component.html',
  styleUrls: ['./image.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageComponent {
  @Input() image: Image;
}
