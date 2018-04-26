import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { Observer } from 'rxjs/Observer';
let EventSource = window['EventSource'];

@Injectable()
export class EventSourceUtil {

	public fromEventSource(url: string, openObserver?: () => void): Observable<any> {
		return new Observable<any>((observer: Observer<any>) => {
			const subscriber = new Subscriber(openObserver);
			const source = new EventSource(url);

			source.onopen = (event: Event) => {
				subscriber.next(event);
				subscriber.complete();
			};

			source.onmessage = (event: MessageEvent) => {
				observer.next(JSON.parse(event.data));
			};

			source.onerror = (event: Event) => {
				if (source.readyState === EventSource.CLOSED) {
					return observer.complete();
				}
				return observer.error(event);
			};

			return () => {
				source.close();
			};
		});
    }

}
