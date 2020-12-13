import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { ToastController } from '@ionic/angular';

import { createErrorToast } from '../app.component';
import { DBUser } from '../interfaces';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  uname = '';
  email = '';
  password = '';
  passwordagain = '';

  constructor(
    public auth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router,
    public toastCtl: ToastController,
    ) {
      auth.onAuthStateChanged((user) => {
        if (user) {
          // user is signed in
          this.router.navigateByUrl("/chatpage").then(nav => {}, err => {
            createErrorToast(this.toastCtl, err);
          });
        }
      })
    }

  signup(): void {
    if (this.password === this.passwordagain) {
      this.auth.createUserWithEmailAndPassword(this.email, this.password).then((user) => {
        this.db.collection<DBUser>('/users').doc(`${user.user.uid}`).set({
          uid: user.user.uid,
          uname: this.uname,
        });
      })
      .catch((err) => {
        createErrorToast(this.toastCtl, err.message);
      });
    } else {
      createErrorToast(this.toastCtl, "Passwords don't match.");
    }
  }


  ngOnInit() {
  }

  btnClicked(){
    console.log("It works!");
  }
}
