import { Injectable } from '@angular/core';
import { Firestore, CollectionReference, addDoc, collection, deleteDoc, doc, updateDoc, collectionData, Query, docData} from '@angular/fire/firestore';
import { Moment } from 'src/app/interfaces/moment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  moments = collection(this.firestore, 'our-history');

  constructor(
    private firestore: Firestore,
  ) { }

  getAllMoments() {
    return collectionData(this.moments, {
      idField: 'id'
    }) as Observable<Moment[]>;
  }
}
