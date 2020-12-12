import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

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

login(email: string, password: string): void {
  this.auth.signInWithEmailAndPassword(email, password).then(() => {
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

}
