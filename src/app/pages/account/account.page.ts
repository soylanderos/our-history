import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FeedbackService } from 'src/app/services/feedback/feedback.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  constructor(
    private auth: AuthService,
    private FbService: FeedbackService,
    private router: Router
  ) { }

  async ngOnInit() {
    console.log('AccountPage');
  }

  async logout() {
    await this.auth.logout()
       .then(() => {
         this.FbService.showToast('Sesión Cerrada');
         this.router.navigate(['/login']);
       })
       .catch(error => {
         console.error(error);
       });
   }

}
