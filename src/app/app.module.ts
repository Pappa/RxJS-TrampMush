import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ImageComponent } from './image/image.component';
import { TweetComponent } from './tweet/tweet.component';
import { SentimentComponent } from './sentiment/sentiment.component';


@NgModule({
  declarations: [
    AppComponent,
    ImageComponent,
    TweetComponent,
    SentimentComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
