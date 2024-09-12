import { Injectable } from '@angular/core';
import { Firestore, CollectionReference, addDoc, collection, deleteDoc, doc, updateDoc, collectionData, Query, docData} from '@angular/fire/firestore';
import { Moment } from 'src/app/interfaces/moment';
import { Observable } from 'rxjs';
import { UserAccount } from 'src/app/interfaces/user';
import { getDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  moments = collection(this.firestore, 'our-history');
  users = collection(this.firestore, 'users');

  constructor(
    private firestore: Firestore,
  ) { }

  getAllMoments() {
    return collectionData(this.moments, {
      idField: 'id'
    }) as Observable<Moment[]>;
  }
  
  async getDocument(path: string) {
    const docRef = doc(this.firestore, path);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  }

}
