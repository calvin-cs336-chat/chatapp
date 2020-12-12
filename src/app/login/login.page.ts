import { Component, OnInit } from '@angular/core';
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
    public toastCtl: ToastController,
    ) {}

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
