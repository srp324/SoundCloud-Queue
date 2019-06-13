import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { SearchService } from '../search-service/search.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  public user: firebase.User;
  public queuesCollectionRef = this.firestore.collection('queues');
  public queues: Array<any> = [];

  constructor(public firestore: AngularFirestore, public afAuth: AngularFireAuth, public sc: SearchService) { }

  getUser(userId: string): Observable<any> {
    return this.firestore.collection('users', ref => ref.where('uid', '==', userId)).snapshotChanges();
  }

  getCurrentUser() {
    return firebase.auth().currentUser;
  }

  getQueue(userId: string) {
    this.firestore.collection('queues', ref => ref.where('user_id', '==', userId)).snapshotChanges().subscribe(data => {
      const trackIds = data.map(e => (e.payload.doc.data() as any).track_ids);
      (trackIds[0] as Array<any>).forEach((item, index) => {
        this.sc.getTrack(item).then(track => this.queues[index] = track);
      });
    });
  }

  clearQueue() {
    this.queues = [];
  }

  logout() {
    return new Promise((resolve, reject) => {
      if (firebase.auth().currentUser){
        this.afAuth.auth.signOut();
        resolve();
      }
      else
        reject();
    });
  }
}
