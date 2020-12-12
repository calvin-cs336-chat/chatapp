import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastController } from '@ionic/angular';
import { createErrorToast } from '../app.component'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  constructor(
    public auth: AngularFireAuth,
    public toastCtl: ToastController,
    ) {}

  signup(email: string, password: string): void {
    this.auth.createUserWithEmailAndPassword(email, password).then(() => {
      // the user is signed in
    })
    .catch((err) => {
      createErrorToast(this.toastCtl, err.message);
    });
  }


  ngOnInit() {
  }

  btnClicked(){
    console.log("It works!");
  }
}
