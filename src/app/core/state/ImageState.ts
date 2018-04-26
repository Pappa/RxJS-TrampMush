import { Injectable } from '@angular/core';
import * as Models from '../models/Models';

@Injectable()
export class ImageState {

    image: Models.Image;

    constructor() {
    }

    public setImage(image: Models.Image): void {
        this.image = image;
    }

}