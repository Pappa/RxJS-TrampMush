import { NgModule }      from '@angular/core';

import { TweetState } from "./state/TweetState";
import { TweetStateUpdates } from "./state/TweetStateUpdates";
import { TweetEvents } from "./events/TweetEvents";

import { TweetEventsMapper } from "./mappers/TweetEventsMapper";

import { EventSourceUtil } from "./util/EventSourceUtil";
import { TweetUtil } from "./util/TweetUtil";

@NgModule({
  providers: [
	TweetState,
	TweetStateUpdates,
	TweetEvents,
	TweetEventsMapper,
	EventSourceUtil,
	TweetUtil
  ]
})

export class CoreModule { }
