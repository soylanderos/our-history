import { Component } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { StorageService } from 'src/app/services/storage/storage.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { FeedbackService } from 'src/app/services/feedback/feedback.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage  {

  image: any;
  selectedCategory: string = '';
  descripcion: string = '';
  fechaHora: string = '2022-04-21T00:00:00';
  ubicacion: string = '';
  momentCategories: string[] = [
    'Trips together',
    'Special dates',
    'Romantic activities',
    'Unique moments',
    'Gifts and surprises',
    'Relationship milestones',
    'Fun moments',
    'Emotional moments',
    'Adventures',
    'Special celebrations'
  ];

  constructor(
    private firestore: Firestore,
    private storageService: StorageService,
    private feedbackService: FeedbackService,
    private router: Router
  ) {}

  async takePicture() {
    try {
      if (Capacitor.getPlatform() != 'web') await Camera.requestPermissions();
      const image = await Camera.getPhoto({
        quality: 90,
        source: CameraSource.Prompt,
        width: 600,
        resultType: CameraResultType.DataUrl
      });
      this.image = image.dataUrl;
    } catch(e) {
      console.log(e);
    }
  }

  async agregarMomento() {
    try {
      if (!this.image) {
        console.log('No moment has been taken.');
        return;
      }
      this.feedbackService.showLoading('Adding moment...');
      const blob = this.dataURLtoBlob(this.image);
      const url = await this.storageService.uploadImage(blob);
      const response = await this.addDocument('our-history', {
        imageUrl: url,
        selectedCategory: this.selectedCategory,
        descripcion: this.descripcion,
        fechaHora: this.fechaHora,
        ubicacion: this.ubicacion
      });
      console.log(response);
      this.feedbackService.dismissLoading();
      this.feedbackService.showToast('Your moment has been successfully added.');
      this.router.navigate(['/tabs/home']);
      //clean inputs
      this.resetForm();
    } catch(e) {
      console.log(e);
      this.feedbackService.showToast('Error adding moment.');
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

  private async addDocument(path: any, data: any) {
    const dataRef = collection(this.firestore, path);
    return addDoc(dataRef, data);
  }

  getCurrentDate() {
    const currentDate = new Date();
    const utcOffset = currentDate.getTimezoneOffset() * 60000; // Offset en milisegundos
    const utcDate = new Date(currentDate.getTime() - utcOffset); // Convertir a UTC
    this.fechaHora = utcDate.toISOString();
  }


  openCalendar() {
    console.log('Abrir calendario');
  }

  resetForm() {
    this.image = '';
    this.selectedCategory = '';
    this.descripcion = '';
    this.fechaHora = '';
    this.ubicacion = '';
  }
}
