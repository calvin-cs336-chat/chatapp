import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    firestore: AngularFirestore,
    public auth: AngularFireAuth,
  ) {
    this.initializeApp();
    //dark
    const changeDark = window.matchMedia('(prefers-color-scheme:dark)');
    this.darkMode = changeDark.matches;
  }

  /* Failed dark mode
  toggleTheme(event){
    if(event.detail.checked){
      document.body.setAttribute('color-theme', 'dark');
    }
    else{
      document.body.setAttribute('color-theme', 'light');
    }
  }

  */

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.checkDarkTheme();
    });
  }


  
  darkMode:boolean = true;

  //Dark mode
  change(){
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark');
  }

  //dark mode
  checkDarkTheme(){
    const changeDark = window.matchMedia('(prefers-color-scheme: dark)');
    if (changeDark.matches){
      document.body.classList.toggle('dark');
    }
  }
  logout() {
    this.auth.signOut();
  }
}

export async function createErrorToast(toastCtl: ToastController, msg: string) {
  const toast = await toastCtl.create({
    message: `Error: ${msg}`,
    duration: 5000,
  });
  await toast.present();
}
