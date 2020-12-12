import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    public auth: AngularFireAuth,
    public toastCtl: ToastController,
    ) {}

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

  ngOnInit() {
  }

}
