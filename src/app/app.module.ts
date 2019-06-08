import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolbarComponent, LoginDialogComponent } from './core/toolbar/toolbar.component';
import { SearchComponent } from './core/search/search.component';
import { QueueComponent } from './core/queue/queue.component';

import { SearchService } from './services/search-service/search.service';
import { QueueService } from './services/queue-service/queue.service';
import { FirebaseService } from './services/firebase-service/firebase.service';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    LoginDialogComponent,
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
    AngularFireAuthModule,
    AngularFireStorageModule,
    NgxAuthFirebaseUIModule.forRoot(environment.firebase)
  ],
  providers: [
    SearchService,
    QueueService,
    FirebaseService
  ],
  entryComponents: [LoginDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
