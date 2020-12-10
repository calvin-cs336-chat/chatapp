import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-chatpage',
  templateUrl: './chatpage.page.html',
  styleUrls: ['./chatpage.page.scss'],
})
export class ChatpagePage implements OnInit {

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

  constructor() { }

  ngOnInit() {
  }

}
