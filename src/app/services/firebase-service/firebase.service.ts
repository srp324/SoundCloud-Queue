import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public db: AngularFirestore, public afAuth: AngularFireAuth) { }

  getUser(userId: string): Observable<any> {
    return this.db.collection('users', ref => ref.where('uid', '==', userId)).snapshotChanges();
  }

  getCurrentUser() {
    return firebase.auth().currentUser;
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
