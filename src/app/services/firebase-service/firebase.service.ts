import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { SoundCloudService } from '../soundcloud-service/soundcloud.service';
import { Track } from '../../models/Track';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  public user: firebase.User;
  public queueId = "";
  public queues: Array<any> = [];

  constructor(public firestore: AngularFirestore, public afAuth: AngularFireAuth, public scService: SoundCloudService) { }

  getQueue(userId: string) {
    this.firestore.collection('queues', ref => ref.where('user_id', '==', userId)).snapshotChanges().subscribe(data => {
      const trackIds = data.map(e => {
        const payload: any = e.payload.doc;
        this.queueId = payload.id;                                                                            // TODO: Remove when logged out
        return payload.data().track_ids;
      });

      if (trackIds.length > 0) {
        (trackIds[0] as Array<any>).forEach((item, index) => {
          this.scService.getTrack(item).then(track => this.queues[index] = track);
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

  removeFromQueue(trackId: string) {
    // TODO: Handle when not logged in
    const trackIds = [];
    this.queues.map(value => {
      if (value !== trackId)
        trackIds.push(value.id);
    });
    this.queues.splice(this.queues.indexOf(trackId), 1);
    this.firestore.doc('queues/' + this.queueId).update({track_ids: trackIds, user_id: this.user.uid});
  }

  setQueue(newQueue: Array<any>) {
    this.queues = newQueue;
  }

  clearQueue() {
    this.queues = [];
  }

  logout() {
    return new Promise((resolve, reject) => {
      if (firebase.auth().currentUser){
        this.afAuth.auth.signOut();
        this.user = null;
        resolve();
      }
      else
        reject();
    });
  }
}
