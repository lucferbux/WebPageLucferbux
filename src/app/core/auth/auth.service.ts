import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap} from 'rxjs/operators';
import { EmailPasswordCredentials } from './AuthUser';
import { NotifyService } from '../notify.service';

interface User {
  uid: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    public notify: NotifyService
  ) { 

    this.user = this.afAuth.authState.pipe( //get the given user
      switchMap(user =>  {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
        } else {
          return of(null)
        }
      })
    )
  }

  googleLogin() { //logs with google
    const provider = new auth.GoogleAuthProvider()
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider) { //logs with auth login in popup
    return this.afAuth.signInWithPopup(provider)
      .then((credential) => {
        this.updateUserData(credential.user)
      })
  }


  private updateUserData(user) {
    // Sets user data to firestore on login

    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email,
    }

    return userRef.set(data, { merge: true })

  }



  
    emailLogin(email: string, password: string) {
      return this.afAuth
        .signInWithEmailAndPassword(email, password)
        .then(credential => {
          this.notify.logginStatus.emit("Usuario loggeado correctamente")
          return this.updateUserData(credential.user);
        })
        .catch(error => {
          this.notify.logginStatus.emit("Error, usuario o contraseña incorrecto")
          this.handleError(error)
        });
    }

    emailLoginForm(credentials: EmailPasswordCredentials){
      this.emailLogin(credentials.email, credentials.password);
    }
  

    // If error, console log and notify user
    private handleError(error: Error) {
      console.error(error);
      //this.notify.update(error.message, 'error');
    }

  signOut() {
    this.afAuth.signOut().then(() => {
        this.router.navigate(['/']);
    });
  }  
}
