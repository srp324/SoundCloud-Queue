import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public db: AngularFirestore) { }

  getUser(userId: string): Observable<any> {
    return this.db.collection('users', ref => ref.where('uid', '==', userId)).snapshotChanges();
  }
}
