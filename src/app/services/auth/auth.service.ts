import { Injectable } from '@angular/core';
import { Auth, authState , signInWithEmailAndPassword, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, CollectionReference, addDoc, collection, deleteDoc, doc, updateDoc, collectionData, Query, docData} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { FeedbackService } from '../feedback/feedback.service';
import { DocumentReference } from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState$ = authState(this.afAuth)

  constructor(
    private afAuth: Auth,
    private firestore: Firestore,
    private router: Router,
    private FbService: FeedbackService,

  ) { }

  async login(email: string, password: string) {
      await signInWithEmailAndPassword(this.afAuth, email, password)
      .then(() => {
        // El usuario ha iniciado sesión correctamente
        this.FbService.showToast('Inicio de sesión exitoso');
        this.router.navigate(['/tabs/home']);
      })
      .catch(error => {
        if (error.code === 'auth/wrong-password') {
          this.FbService.showToast('Contraseña incorrecta');
        }
        else if(error.code === 'auth/user-not-found'){
          this.FbService.showToast('Usuario no registrado');
        }
        else {
          this.FbService.showToast('Error al iniciar sesión');
        }
      });
    }

  logout() {
    return this.afAuth.signOut();
  }

  isAuthenticated() {
    return this.authState$;
  }




}
