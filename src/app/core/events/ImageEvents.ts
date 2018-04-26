import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/empty';
import * as Models from '../models/Models';

@Injectable()
export class ImageEvents {

    requests = {
        getImage: new Subject<string>()
    }

    responses = {
        getImageSuccess: new Subject<Models.Image>(),
        getImageError: new Subject<Models.Error>()
    }

    constructor(
        private http: Http
    ) { 
        this.initGetImage();
    }

    private initGetImage(): void {
        this.requests.getImage
        .concatMap((search: string) => {
            return this.http.get(`/image?q=${search}`)
                .catch((response: Response) => {
                    this.responses.getImageError.next(response.json());
                    return Observable.empty();
                })
        })
        .map((response: Response): Models.Image => {
            return response.json();
        })
        .subscribe((image: Models.Image) => {
            this.responses.getImageSuccess.next(image);
        });
    }
}