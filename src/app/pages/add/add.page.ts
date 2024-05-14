import { Component } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { StorageService } from 'src/app/services/storage.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage  {

  descripcion: string = '';
  fechaHora: string = '';
  ubicacion: string = '';

  constructor(
    private firestore: Firestore,
    private storageService: StorageService,
  ) {}

  async takePictureAndUpload() {
    try {
      if (Capacitor.getPlatform() != 'web') await Camera.requestPermissions();
      const image = await Camera.getPhoto({
        quality: 90,
        source: CameraSource.Prompt,
        width: 600,
        resultType: CameraResultType.DataUrl
      });
      const blob = this.dataURLtoBlob(image.dataUrl);
      const url = await this.storageService.uploadImage(blob);
      const response = await this.addDocument('our-history', {
        imageUrl: url,
        descripcion: this.descripcion,
        fechaHora: this.fechaHora,
        ubicacion: this.ubicacion
      });
      console.log(response);
    } catch(e) {
      console.log(e);
    }
  }

  private dataURLtoBlob(dataurl: any) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime});
  }

  private addDocument(path: any, data: any) {
    const dataRef = collection(this.firestore, path);
    return addDoc(dataRef, data);
  }
}
