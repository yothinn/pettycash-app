import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { filter, map, shareReplay, takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ResetPasswordComponent } from 'src/app/modules/auth/reset-password/reset-password.component';


@Component({
  selector: 'app-layout1',
  templateUrl: './layout1.component.html',
  styleUrls: ['./layout1.component.scss']
})
export class Layout1Component implements OnInit, OnDestroy {

  isChild = false;
  user: any;
  accounts: any;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  pageName$: Observable<any> = this.router.events
    .pipe(
      filter((event) => event instanceof NavigationEnd)
    );
  // Private
  private _unsubscribeAll: Subject<any>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    public auth: AuthService,
    private router: Router,
    public dialog: MatDialog,
  ) {
    // Set the private defaults
    this._unsubscribeAll = new Subject();
    // this.auth.getAccounts().subscribe((res: any) => {
    //   this.accounts = res.data;
    // })
    // this.accounts = this.auth.getAccounts();
  }

  ngOnInit(): void {
    this.auth.authStateObservable$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((isAuthenticated) => {
        if (!isAuthenticated) {
          this.router.navigateByUrl('');
        }
      });

    this.auth.authUserStateObservable$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((user) => {
        // console.log(user);
        this.user = user;
      });

    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((data) => {
        const objData = JSON.stringify(data);
        const jsonData = JSON.parse(objData);
        this.isChild = jsonData.url.split('/').length > 2;
      });
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }


  logout(): void {
    this.auth.logout();
  }

  openResetPasswordDialog() {
    const dialogRef = this.dialog.open(ResetPasswordComponent, {
      width: '30vw',
      panelClass: 'custom-dialog-container',

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    })
  }

}
