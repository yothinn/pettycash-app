import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CustomerInfoService } from './customer-info.service';


@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.scss']
})
export class CustomerInfoComponent implements OnInit, OnDestroy {
 
  // Customer id
  @Input() customerInfo: any;

  // Contact id
  @Input() contactInfo: any;
 

  // Emit line chat id , fb id
  @Output() lineCustomerClick = new EventEmitter<string>();
  @Output() fbCustomerClick = new EventEmitter<string>();

  @Output() lineContactClick = new EventEmitter<string>();
  @Output() fbContactClick = new EventEmitter<string>();

  // Customer infomation
  // @Input() info: any;


  private _unsubscribeAll: Subject<any>;
  
  constructor(
    private _infoService: CustomerInfoService,

  ) { 
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    
    // console.log(this.customerId);
    // console.log(this.contactId);


    // this._infoService.getCustomerInfo(this.customerId)
    //     .pipe(takeUntil(this._unsubscribeAll))
    //     .subscribe((v: any) => {
    //       console.log(v);
    //       this.customerInfo = v.data;
    //     });

    // this._infoService.getContactInfo(this.contactId)
    //     .pipe(takeUntil(this._unsubscribeAll))
    //     .subscribe((v: any) => {
    //       console.log(v);
    //       this.contactInfo = v.data;
    //     });
  }

  ngOnDestroy() {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  onLineCustomerClick() {
    console.log('customer line click');
    this.lineCustomerClick.emit(this.customerInfo?.lineUID);
  }

  onFbCustomerClick() {
    // TODO : change to variable facebook id
    this.lineCustomerClick.emit('customer fb id');
  }

  onLineContactClick() {
    this.lineContactClick.emit(this.contactInfo?.lineUID);
  }

  onFbContactClick() {
    // TODO : change to variable facebook id
    this.lineContactClick.emit('contact fb id')
  }

}
