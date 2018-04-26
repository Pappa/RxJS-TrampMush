import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ImageState } from "./ImageState";
import { ImageEvents } from "../events/ImageEvents";
import * as Models from "../models/Models";

@Injectable()
export class ImageStateUpdates {

    public subject: BehaviorSubject<ImageState>;

    constructor(
        private imageState: ImageState,
        private imageEvents: ImageEvents
    ) {

        this.subject = new BehaviorSubject(imageState);

        this.imageEvents.responses.getImageSuccess
            .subscribe((image: Models.Image) => {
                this.imageState.setImage(image);
                this.subject.next(this.imageState);
            });

        this.imageEvents.responses.getImageError
            .subscribe((error: Models.Error) => {
                this.imageState.setImage(null);
                this.subject.next(null);
            });

    }
}