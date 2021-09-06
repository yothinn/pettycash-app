import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {

  user: any;

  private _unsubscribeAll: Subject<any>;  

  constructor(
    public auth: AuthService,
  ) { 
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.auth.authUserStateObservable$
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((user) => {
          this.user = user;
        
          console.log(this.user);
        });

  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  isAdminRole(): boolean {
    return this.auth.isAdmin(this.user);
  }

 

}
