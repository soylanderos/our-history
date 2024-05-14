import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(
    private toastController: ToastController,
    private alertController: AlertController,
    private loadingController: LoadingController
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

  async showLoading(message: string) {
    const loading = await this.loadingController.create({
      message
    });
    await loading.present();
    return loading;
  }

  async dismissLoading() {
    await this.loadingController.dismiss();
  }
}
