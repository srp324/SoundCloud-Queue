import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material-module';
import { SearchComponent } from './search/search.component';
import { QueueComponent } from './queue/queue.component';

import { SearchService } from './services/search-service/search.service';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    QueueComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [SearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
