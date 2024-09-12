import { Injectable } from '@angular/core';
import { Firestore, collectionData, docData, doc, collection, addDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MomentService {

  private momentsCollection = collection(this.firestore, 'moments');

  constructor(private firestore: Firestore) {}

  getMoments(): Observable<any[]> {
    return collectionData(this.momentsCollection, { idField: 'id' });
  }

}
