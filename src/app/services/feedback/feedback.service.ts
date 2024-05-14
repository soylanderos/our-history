import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(
    private toastController: ToastController,
    private alertController: AlertController
    ) { }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000
    });
    toast.present();
  }
  //alert feedback
  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    alert.present();
  }
}
