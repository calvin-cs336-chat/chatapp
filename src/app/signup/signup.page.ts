import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastController } from '@ionic/angular';

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
      this.createErrorToast(err.message);
    });
  }

  async createErrorToast(msg: string) {
    const toast = await this.toastCtl.create({
      message: msg,
      duration: 3000,
    });
  }

  ngOnInit() {
  }

  btnClicked(){
    console.log("It works!");
  }
}
