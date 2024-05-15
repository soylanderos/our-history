import { FeedbackService } from '../../services/feedback/feedback.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  loginForm: FormGroup;
  inputType: string = 'password';
  iconType: string = 'eye-off';
  loading: any;


  constructor(
    private fb: FormBuilder,
    private afAuth: AuthService,
    private FbService: FeedbackService,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
   }

  async ngOnInit() {
    await console.log('LoginPage');
  }

  //Functions
  togglePassword() {
    this.inputType = this.inputType === 'password' ? 'text' : 'password';
    this.iconType = this.iconType === 'eye-off' ? 'eye' : 'eye-off';
  }

  async login() {
    if(this.loginForm.invalid){
      this.FbService.showToast('Enter your username and password');
      return;
    }
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    if(this.loginForm.valid){
      this.FbService.showLoading('Logging in...');
      await this.afAuth.login(email, password)
      .then(() => {
        this.loading.dismiss();
        this.FbService.dismissLoading();
      })
      .catch(() => {
        this.loading.dismiss();
        this.FbService.dismissLoading();
      })
    }
  }

}
