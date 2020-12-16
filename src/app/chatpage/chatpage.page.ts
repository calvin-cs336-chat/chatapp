import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, ToastController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { DBChatMsg, DBUser } from '../interfaces'
import * as firebase from 'firebase';

import { File } from '@ionic-native/file/ngx'
import { createErrorToast } from '../app.component';

@Component({
  selector: 'app-chatpage',
  templateUrl: './chatpage.page.html',
  styleUrls: ['./chatpage.page.scss'],
})
export class ChatpagePage implements OnInit {
  messages: DBChatMsg[] = [];
  user: DBUser;
  enterMsg = '';
  @ViewChild(IonContent) content: IonContent

  constructor(
      private db: AngularFirestore,
      public auth: AngularFireAuth,
      private router: Router,
      public toastCtl: ToastController,
      public file: File,
    ) {
    this.db.collection<DBChatMsg>('/chat').valueChanges().subscribe((res) => {
      this.messages = res;
    });

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


  sendMsg(): void {
    const time = firebase.default.firestore.Timestamp.now();
    this.db.collection<DBChatMsg>('/chat').doc(`${time}`).set({
      user: this.user.uname,
      msg: this.enterMsg,
      dateSent: time,
      likes: [],
    });
    this.enterMsg = '';
    setTimeout(() => {
      this.content.scrollToBottom(200);
    });
  }

  like(msg: DBChatMsg) {
    const index = msg.likes.indexOf(this.user.uid);
    if (index === -1) {
      msg.likes.push(this.user.uid);
    } else {
      msg.likes.splice(index, 1);
    }
    this.db.collection<DBChatMsg>('/chat').doc(`${msg.dateSent}`).update({
      likes: msg.likes,
    });
  }
  
  ngOnInit() {
  }

}
