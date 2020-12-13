import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastController } from '@ionic/angular';
import { createErrorToast } from '../app.component';

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
    public toastCtl: ToastController,
    ) {}

  signup(): void {
    if (this.password === this.passwordagain) {
      this.auth.createUserWithEmailAndPassword(this.email, this.password).then((user) => {
        user.user.updateProfile({
          displayName: this.uname,
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
