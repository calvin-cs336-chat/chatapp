import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, ToastController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { DBChatMsg, DBUser } from '../interfaces'
import * as firebase from 'firebase';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx'
import { File } from '@ionic-native/file/ngx'
import { createErrorToast } from '../app.component';

@Component({
  selector: 'app-chatpage',
  templateUrl: './chatpage.page.html',
  styleUrls: ['./chatpage.page.scss'],
})
export class ChatpagePage implements OnInit {
  messages: DBChatMsg[] = [];
  imgURL;
  pictures:any=[];
  likeCount: number = 0;
  dislikeCount:number = 0;


  textChat = [
    
    {
      user: "Mark",
      dateSent: 1554093856000,
      msg:"Yo!"
    },
    {
      user: "Ian",
      dateSent: 1554097156000,
      msg:"Hello"
    },
    {
      user: "Josh",
      dateSent: 1554093856000,
      msg:"Hey!"
    },
    {
      user: "Mark",
      dateSent: 1554092056000,
      msg:"I am bored!"
    }
    
  ]

  currentUser = 'Mark'
  enterMsg = '';
  @ViewChild(IonContent) content: IonContent

  sendText(){
    this.textChat.push({
      user: 'Mark',
      dateSent: new Date().getTime(),
      msg: this.enterMsg
    });

    this.enterMsg = '';

    setTimeout(() => {
      this.content.scrollToBottom(200);
    })
  }

  constructor(
      private db: AngularFirestore,
      public auth: AngularFireAuth,
      private router: Router,
      public toastCtl: ToastController,
      private camera: Camera,
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

  user: DBUser;

  sendMsg(): void {
    const time = firebase.default.firestore.Timestamp.now();
    this.db.collection<DBChatMsg>('/chat').doc(`${time}`).set({
      user: this.user.uname,
      msg: this.enterMsg,
      dateSent: time,
      likes: [],
    });
    this.enterMsg = '';
  }

  chatCamera(){
    const options: CameraOptions={
      quality:100,
      mediaType:this.camera.MediaType.PICTURE,
      destinationType:this.camera.DestinationType.FILE_URI,
      encodingType:this.camera.EncodingType.JPEG
    }
    this.camera.getPicture().then((ImageData)=>{
      let filename = ImageData.substring(ImageData.lastIndexOf('/')+1);
      let path = ImageData.substring(0, ImageData.lastIndexOf('/')+1);
      this.file.readAsDataURL(path, filename).then((base64data)=>{
        this.pictures.push(base64data);
      })
    })
  }
  
  likeButton(){
    this.likeCount++;
  }

  dislikeButton(){
    this.dislikeCount++;
  }


  ngOnInit() {
  }

}
