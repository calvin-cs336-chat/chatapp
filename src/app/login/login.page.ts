import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastController } from '@ionic/angular';
import { createErrorToast } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  email = '';
  password = '';

  constructor(
    public auth: AngularFireAuth,
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
      });
    }

  login(): void {
    this.auth.signInWithEmailAndPassword(this.email, this.password).then(() => {
      // the user is signed in
    })
    .catch((err) => {
      createErrorToast(this.toastCtl, err.message);
    });
  }

  ngOnInit() {
  }

}
