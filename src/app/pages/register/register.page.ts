import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { Router } from '@angular/router';
import { UserAccount } from 'src/app/interfaces/user';
import { FeedbackService } from 'src/app/services/feedback/feedback.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  registerForm: FormGroup;
  avatarImageUrl: string = '';
  inputType: string = 'password';
  inputTypePassword: string = 'password';
  iconType: string = 'eye-off';
  iconTypePassword: string = 'eye-off';


  user: UserAccount

  constructor(
    private fb: FormBuilder,
    private afAuth: AuthService,
    private router: Router,
    private feedback: FeedbackService,
    private storageService: StorageService,

  ) {
    this.user = {
      uid: '', firstName: '', lastName: '', email: '', password: '', avatarUrl: ''
    }
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      avatar: [''] 
    });
  }

  navigateToLogin(){
    this.registerForm.reset();
    this.avatarImageUrl = '';
    this.router.navigate(['/login']);
  }
  
  togglePassword() {
    this.inputType = this.inputType === 'password' ? 'text' : 'password';
    this.iconType = this.iconType === 'eye-off' ? 'eye' : 'eye-off';
  }

  toggleConfirmPassword() {
    this.inputTypePassword = this.inputTypePassword === 'password' ? 'text' : 'password';
    this.iconTypePassword = this.iconTypePassword === 'eye-off' ? 'eye' : 'eye-off';
  }

  async takePicture() {
    try {
      if (Capacitor.getPlatform() != 'web') await Camera.requestPermissions();
      const image = await Camera.getPhoto({
        quality: 90,
        source: CameraSource.Prompt,
        width: 600,
        resultType: CameraResultType.DataUrl
      });
      this.avatarImageUrl = image.dataUrl ?? '';
    } catch(e) {
      console.log(e);
    }
  }
  
  private dataURLtoBlob(dataurl: string) {
    if (!dataurl) {
      throw new Error("Invalid data URL");
    }
  
    const arr = dataurl.split(',');
    if (arr.length !== 2) {
      throw new Error("Invalid data URL format");
    }
  
    const match = arr[0].match(/:(.*?);/);
    if (!match || match.length < 2) {
      throw new Error("Invalid MIME type in data URL");
    }
  
    const mime = match[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
  
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
  
    return new Blob([u8arr], { type: mime });
  }
  
  
  
  

  async register() {
    const firstName = this.registerForm.value.firstName;
    const lastName = this.registerForm.value.lastName;
    const email = this.registerForm.value.email;
    const password = this.registerForm.value.password;
    const confirmPassword = this.registerForm.value.confirmPassword;
  
    if (password !== confirmPassword) {
      this.feedback.showToast('Passwords do not match');
      return;
    }
  
    if (this.registerForm.valid) {
      try {
        this.feedback.showLoading('Registering user...');
        
        const blob = this.dataURLtoBlob(this.avatarImageUrl);
        const avatarUrl = await this.storageService.uploadImageUser(blob);
  
        await this.afAuth.register(email, password, firstName, lastName, avatarUrl)
        .then(() => {
          console.log('User registered successfully');
        }).catch((error) => {
          console.error('Error registering user:', error);
        });
  
        this.registerForm.reset();
      } catch (error) {
        console.error('Error processing avatar image:', error);
        this.feedback.showToast('There was an error processing the avatar image.');
      }
    } else {
      this.feedback.showToast('Please fill all the fields');
    }
  }
  
    
  

  isFieldValid(field: string) {
    const control = this.registerForm.get(field);
    return control && control.valid && (control.dirty || control.touched);
  }

}
