import { Component, Input } from '@angular/core';
import { Image } from '../core/models/Models';

@Component({
  selector: 'image',
  templateUrl: 'image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent {
  @Input() image: Image;
}
