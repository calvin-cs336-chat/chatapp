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

  confirm() {
    if (this.newUname !== '') {
      this.db.collection<DBUser>('/users').doc(this.user.uid).update({
        uname: this.newUname,
      });
    }
    if (this.newPass !== '' && this.newPass === this.newPassConfirm) {
      this.auth.currentUser.then((user) => {
        user.reauthenticateWithCredential(firebase.default.auth.EmailAuthProvider.credential(user.email, this.oldPass)).then(() => {
          // Old Password was correct
          user.updatePassword(this.newPass).then(() => {
            // Password updated successfully
            createErrorToast(this.toastCtl, "Password updated successfully."); // I suppose this is the one use case
                                                                               // where it's not an "error toast"...
          }).catch((err) => {
            // Password Update failed
            createErrorToast(this.toastCtl, err);
          });
        }).catch((err) => {
          // Old Password was not correct
          createErrorToast(this.toastCtl, err);
        });
      });
    }
  }

  ngOnInit() {
  }

}
