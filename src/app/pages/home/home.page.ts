import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  moments: any[] = [];

  constructor(
    private firestoreService: FirestoreService
  ) { }

  async ngOnInit() {
    await this.getMoments();
  }

  getMoments() {
    this.firestoreService.getAllMoments().subscribe((moments) => {
      this.moments = moments;
    });
  }

}
