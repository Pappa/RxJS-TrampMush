import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { Observer } from 'rxjs/Observer';
let EventSource = window['EventSource'];

@Injectable()
export class EventSourceUtil {
  private zone: NgZone;

  constructor() {
    this.zone = new NgZone({ enableLongStackTrace: false });
  }

	public fromEventSource(url: string, openObserver?: () => void): Observable<any> {
		return new Observable<any>((observer: Observer<any>) => {
			const subscriber = new Subscriber(openObserver);
			const source = new EventSource(url);

			source.onopen = (event: Event) => {
        this.zone.run(() => {
          subscriber.next(event);
          subscriber.complete();
        });
			};

			source.onmessage = (event: MessageEvent) => {
        this.zone.run(() => {
          observer.next(JSON.parse(event.data));
        });
			};

			source.onerror = (event: Event) => {
				if (source.readyState === EventSource.CLOSED) {
					return this.zone.run(() => {
					  observer.complete();
          });
				}
				this.zone.run(() => {
				  observer.error(event);
        });
			};

			return () => {
				source.close();
			};
		});
    }

}
