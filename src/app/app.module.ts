import { NgModule }      from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { ImageComponent } from './image/image.component';
import { TweetComponent } from './tweet/tweet.component';
import { SentimentComponent } from './sentiment/sentiment.component';

import { CoreModule } from "./core/core.module";
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './app.effects';
import * as fromApp from './app.reducer';


@NgModule({
  declarations: [
    AppComponent,
    ImageComponent,
    TweetComponent,
    SentimentComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    CoreModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([AppEffects]),
    StoreModule.forFeature('app', fromApp.reducer)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
