import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { createErrorToast } from '../app.component';
import { DBUser } from '../interfaces';
import * as firebase from 'firebase';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(
    public auth: AngularFireAuth,
    private db: AngularFirestore,
    public toastCtl: ToastController,
    private router: Router,
  ) {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in
        this.db.collection<DBUser>('/users').doc(`${user.uid}`).get().toPromise().then((doc) => {
          if (doc.exists) {
            this.user = {
              uid: user.uid,
              uname: doc.data().uname,
              avatar: doc.data().avatar,
              color: doc.data().color,
            }
          } else {
            // Data does not exist in database (should never happen!)
            createErrorToast(this.toastCtl, "User data not found! Was it deleted?");
            this.auth.signOut();
          }
        });
      } else {
        // User is NOT signed in (or has signed out)
        router.navigateByUrl("/home");
      }
    });
  }

  user: DBUser;

  newUname = '';
  newPass = '';
  newPassConfirm = '';
  oldPass = '';

  async confirm() {
    if (this.newUname !== '') {
      this.db.collection<DBUser>('/users').doc(this.user.uid).update({
        uname: this.newUname,
      });
    }
    if (this.newPass !== '' && this.newPass === this.newPassConfirm) {
      try {
        const user = await this.auth.currentUser;
        await user.reauthenticateWithCredential(firebase.default.auth.EmailAuthProvider.credential(user.email, this.oldPass));
        await user.updatePassword(this.newPass);
        const toast = await this.toastCtl.create({
          message: `${"Password updated successfully."}`,
          duration: 5000,
        });
        await toast.present();
      } catch (err) {
        createErrorToast(this.toastCtl, err);
      }
    }
  }

  ngOnInit() {
  }

}
