import { AfterViewInit, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { forkJoin, Subject } from 'rxjs';
import { Formbase } from 'src/app/shared/components/formbase/formbase';
import { LineChatService } from '../../../services/line-chat.service';
import { FormbaseService } from 'src/app/shared/components/formbase/formbase.service';
import { concatAll, map, takeUntil } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('drawer') drawer: MatSidenav;

  activeContact: any;
  form: FormGroup;
  formBase: Formbase<string>[] = [];

  lineContact: any;

  subMunus =
    {
      icon: 'shopping_cart',
      name: 'Order',
      description: 'สั่งซื้อ',
      form: 'deal'
    }

  private _unsubscribeAll: Subject<any>;

  constructor(
    private formBaseService: FormbaseService,
    private lineChatService: LineChatService,
    private _ref: ChangeDetectorRef,
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.getLayOuts();

    // TODO: น่าจะเปลี่ยนใหม่
    // onCantactDataChange ถูกส่งตอนเรียน linechatHistory ซึ่งไม่ควร
    // ควรจะเรียกโดยตรงเลย และส่วเป็น activeContact มาเลย ไม่ต้องไป request ใหม่
    // และน่าจะไปเปลี่ยนที่หน้าอื่นๆด้วย
    this.lineChatService.onContactDataChangedObservable$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((contact) => {
        if (this.drawer && this.drawer.opened) {
          this.drawer.opened = false;
        }
        this.activeContact = contact;
        // console.log(this.activeContact);

        this.lineChatService.getLineContact(contact.chatId)
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe((res) => {
            try {
              this.lineContact = res.data;
              // assign contact data to form
              this.formBase.filter((ctl) => { return ctl.key === 'id' })[0].value = this.activeContact.chatId;
              this.formBase.filter((ctl) => { return ctl.key === 'name' })[0].value = this.activeContact.profile?.nickname || this.activeContact.profile?.name;
              this.formBase.filter((ctl) => { return ctl.key === 'lineUId' })[0].value = this.activeContact.chatId;
              this.form = this.formBaseService.toFormGroup(this.formBase);
            } catch (error) {

            }

          });
      })
  }

  ngAfterViewInit() {
    // this.notificationService.start();


  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();

    // this.notificationService.close();
  }

  getLayOuts(): void {
    this.formBaseService.layoutChangedObservable$
      .pipe(
        takeUntil(this._unsubscribeAll),
        map(layouts => { return layouts.filter(layout => layout.key === 'contacts') })
      )
      .subscribe((layouts) => {

        if (layouts && layouts.length > 0) {
          // initial layout
          this.formBase = layouts[0].forms || [];
          this.form = this.formBaseService.toFormGroup(this.formBase);
        }

      })
  }

  

  

  

  onAddNewContactClick(){

  }

}
