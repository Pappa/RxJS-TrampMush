import { NgModule }      from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { ImageComponent } from './image/image.component';
import { TweetComponent } from './tweet/tweet.component';
import { SentimentComponent } from './sentiment/sentiment.component';

import { CoreModule } from "./core/core.module";


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
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
