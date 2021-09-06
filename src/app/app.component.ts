import { Component } from '@angular/core';
import { BnNgIdleService } from 'bn-ng-idle';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-app';
  constructor(private bnIdle: BnNgIdleService,private auth: AuthService ) { 
    // initiate it in your component constructor
    // this.bnIdle.startWatching(300).subscribe((res) => {
    //   if (res) {
    //     console.log("session expired");
    //     this.auth.logout();
    //   }
    // })
  }
}
