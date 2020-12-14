import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    public auth: AngularFireAuth,
    private router: Router,
  ) {
      auth.onAuthStateChanged((user) => {
        if (user) {
          // user is signed in
          this.router.navigateByUrl("/chatpage");
        }
      });
  }

  
}
