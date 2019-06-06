import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QueueService {

  constructor(public db: AngularFirestore) { }

  // TODO: Do I need this method here? or should I make a firebase service
  getUser(userId: string): Observable<any> {
    return this.db.collection('users', ref => ref.where('uid', '==', userId)).snapshotChanges();
  }
}
