import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QueueService {

  constructor(public db: AngularFirestore) { }

  getUser(userId: number): Observable<any> {
    return this.db.collection('users', ref => ref.where('id', '==', userId)).snapshotChanges();
  }
}
