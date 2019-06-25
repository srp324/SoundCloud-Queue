import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { SearchService } from '../search-service/search.service';
import { Track } from '../../models/Track';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  public user: firebase.User;
  public queueId = "";
  public queues: Array<any> = [];

  constructor(public firestore: AngularFirestore, public afAuth: AngularFireAuth, public sc: SearchService) { }

  getUser(userId: string): Observable<any> {
    return this.firestore.collection('users', ref => ref.where('uid', '==', userId)).snapshotChanges();
  }

  getCurrentUser() {
      this.user = firebase.auth().currentUser;
      return this.user;
  }

  getQueue(userId: string) {
    this.firestore.collection('queues', ref => ref.where('user_id', '==', userId)).snapshotChanges().subscribe(data => {
      const trackIds = data.map(e => {
        const payload: any = e.payload.doc;
        this.queueId = payload.id;
        return payload.data().track_ids;
      });

      if (trackIds.length > 0) {
        (trackIds[0] as Array<any>).forEach((item, index) => {
          this.sc.getTrack(item).then(track => this.queues[index] = track);
        });
      }
    });
  }

  addToQueue(trackId: string) {
    // TODO: Handle when not logged in
    const trackIds = [];
    this.queues.map(value => {
      trackIds.push(value.id);
    });
    trackIds.push(trackId);
    this.firestore.doc('queues/' + this.queueId).update({track_ids: trackIds, user_id: this.user.uid}); // TODO: Switch firebase track_ids to complete track info (this.queues)
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
