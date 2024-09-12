import { Injectable } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FeedbackService } from '../feedback/feedback.service';
import { StorageService } from '../storage/storage.service';
import { user, User as FirebaseUser } from '@angular/fire/auth';
import { Firestore, doc, collection, DocumentData, setDoc } from '@angular/fire/firestore';
import { UtilsService } from '../utils/utils.service';
import { FirestoreService } from '../firestore/firestore.service';
import { sendPasswordResetEmail } from '@angular/fire/auth';



@Injectable({providedIn: 'root'})
export class AuthService {

    authState$ = authState(this.afAuth)
   

    constructor(
        private afAuth : Auth,
        private firestore : Firestore,
        private router : Router,
        private FbService : FeedbackService,
        private storageService : StorageService,
        private utilsService : UtilsService,
        private firestoreService : FirestoreService

    ) {
        this.authState$ = user(this.afAuth);
    }
    
    async register(
        email: string,
        password: string,
        firstName: string,
        lastName: string,
        avatar: string
    ) {
        try {
            const userCredential = await createUserWithEmailAndPassword(
                this.afAuth,
                email,
                password
            );
            const user = userCredential.user;
            const avatarUrl = await this.storageService.uploadImageUser(avatar);
            const userRef = collection(this.firestore, 'users');
            const docRef = doc(userRef, user.uid);
            await setDoc(docRef, { uid: user.uid, email, firstName, lastName, avatarUrl });
            this.utilsService.saveInLocalStorage('user', { uid: user.uid, email, firstName, lastName, avatarUrl })
            this.getUserInfo(user.uid);
            this.FbService.dismissLoading();
            this.FbService.showToast('User registered successfully');
            this.router.navigate(['/tabs/home']);
        } catch (error:any) {
            if (error.code === 'auth/email-already-in-use') {
                this.FbService.showToast('Email already in use');
            }
        }
    }
    
    

    async login(email : string, password : string) {
        this.FbService.showLoading('Logging in...');
        await signInWithEmailAndPassword(this.afAuth, email, password)
            .then(() => {
                // El usuario ha iniciado sesión correctamente
                this
                    .FbService
                    .showToast('Successful login');
                this.getUserInfo(this.afAuth.currentUser?.uid as string);
                this
                    .router
                    .navigate(['/tabs/home']);
                this.FbService.dismissLoading();
            })
            .catch(error => {
                if (error.code === 'auth/wrong-password') {
                    this
                        .FbService
                        .showToast('Incorrect password');
                } else if (error.code === 'auth/user-not-found') {
                    this
                        .FbService
                        .showToast('Unregistered user');
                } else {
                    this
                        .FbService
                        .showToast('Failed to login');
                        console.error('Error logging in:', error);
                }
            });
    }

    async getUserInfo(uid: string) {
       let path = `users/${uid}`;
       this.firestoreService.getDocument(path).then((user: DocumentData | null) => {
              this.utilsService.saveInLocalStorage('user', user);
       })
    }

    logout() {
        return this
            .afAuth
            .signOut();
    }

    sendRecoveryEmail(email:string){
        sendPasswordResetEmail(this.afAuth, email)
        .then(() => {
            this.FbService.showToast('Recovery email sent');
        })
        .catch(error => {
           if(error.code === 'auth/user-not-found'){
               this.FbService.showToast('User not found');
            }
            else{
                this.FbService.showToast('Failed to send recovery email');
            }
        })


    }

   
}
