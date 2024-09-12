import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { MomentDetailComponent } from 'src/app/components/moment-detail/moment-detail/moment-detail.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  moments: any[] = [];

  constructor(
    private firestoreService: FirestoreService,
    private modalController: ModalController
  ) { }

  async ngOnInit() {
    await this.getMoments();
  }

  getMoments() {
    this.firestoreService.getAllMoments().subscribe((moments) => {
      this.moments = moments;
    });
  }

  async openMomentDetail(moment: any) {
    const modal = await this.modalController.create({
      component: MomentDetailComponent,
      componentProps: { moment }
    });
    return await modal.present();
  }

}
