import { Injectable } from '@angular/core';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) { }

  async uploadImage(blob: any) {
    try {
      const currentDate = Date.now();
      const filePath = `moments/${currentDate}.jpg`;
      const fileRef = ref(this.storage, filePath);
      await uploadBytes(fileRef, blob);
      const url = await getDownloadURL(fileRef);
      return url;
    } catch(e) {
      console.log(e);
      throw e;
    }
  }

  async uploadImageUser(blob: any) {
    try {
      const currentDate = Date.now();
      const filePath = `users/${currentDate}.jpg`;
      const fileRef = ref(this.storage, filePath);
      await uploadBytes(fileRef, blob);
      const url = await getDownloadURL(fileRef);
      return url;
    }
    catch(e) {
      console.log('error de userimge uplo',e);
      throw e;
    }
  }
}
