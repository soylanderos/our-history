import { FeedbackService } from '../../services/feedback/feedback.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  resetPassword: FormGroup;

  constructor(
    private fb: FormBuilder,
    private afAuth: AuthService,
    private FbService: FeedbackService,
    private router: Router
  ) {
    this.resetPassword = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
   }

  ngOnInit() {
  }

 
    async sendRecoveryEmail() {
      const email = this.resetPassword.value.email;
      if (this.resetPassword.valid) {
        try {
          await this.afAuth.sendRecoveryEmail(email);
          this.FbService.showAlert('Recovery email sent', 'Check your email to reset your password');
          this.router.navigate(['/login']);
          this.resetPassword.reset();
        } catch (error) {
          this.FbService.showToast('Failed to send recovery email');
        }
      }else {
        this.FbService.showToast('Please enter a email');
      }
    }

    navigateToLogin() {
      this.router.navigate(['/login']);
    }
  
}
