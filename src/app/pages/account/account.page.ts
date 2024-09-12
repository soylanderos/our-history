import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FeedbackService } from 'src/app/services/feedback/feedback.service';
import { Router } from '@angular/router';
import { UserAccount } from 'src/app/interfaces/user';
import { User } from 'src/app/interfaces/user';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  user:any
  constructor(
    private auth: AuthService,
    private FbService: FeedbackService,
    private router: Router,
    private utilsService: UtilsService
  ) { }

  ngOnInit() {
    this.user = this.utilsService.getFromLocalStorage('user');
  }


  async logout() {
    await this.auth.logout()
       .then(() => {
         this.FbService.showToast('Sesión Cerrada');
         this.router.navigate(['/login']);
         localStorage.removeItem('user');
       })
       .catch(error => {
         console.error(error);
       });
   }

  

   

}
