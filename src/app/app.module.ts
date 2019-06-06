import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material-module';
import { SearchComponent } from './search/search.component';
import { QueueComponent } from './queue/queue.component';

import { SearchService } from './services/search-service/search.service';
import { QueueService } from './services/queue-service/queue.service';

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
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
  ],
  providers: [SearchService, QueueService],
  bootstrap: [AppComponent]
})
export class AppModule { }
