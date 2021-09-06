import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ContactService } from 'src/app/services/contact.service';
import { OrderService } from 'src/app/services/order.service';
import { PostcodeService } from 'src/app/services/postcode.service';

@Component({
  selector: 'app-sale-order',
  templateUrl: './sale-order.component.html',
  styleUrls: ['./sale-order.component.scss']
})
export class SaleOrderComponent implements OnInit {
  @Input() activeContact: any;
  @Output() onSuccess = new EventEmitter<any>();

  customer: any;
  consignee: any;
  isConcent: false;
  order: any;
  MOBILE_PATTERN = /^[0-9]{10,10}$/;
  POSTCODE_PATTERN = /^[0-9]{5,5}$/;
  postcodesList: any = [];
  temp: any = [];
  contact: any;
  isCompleted: boolean = false;
  lat: number;
  lng: number;
  remark: string = "";
  constructor(
    private formbuilder: FormBuilder,
    private postcodeService: PostcodeService,
    private contactService: ContactService,
    private orderService: OrderService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.postcodeService.getPostcodesList().then((res: any) => {
      this.temp = res.data;
      this.postcodesList = res.data;
    });

    this.createForm();
  }

  createForm(): void {
    this.contactService.getContactByChatId(this.activeContact.profile.userId).subscribe((res) => {
      console.log(res);
      if (res.data && res.data.length > 0  && res.data[0]._id) {
       this.contact = res.data[0];
        this.createOrder(res.data, 1);
      } else {
        this.customer = this.formbuilder.group({
          cuid: this.activeContact.profile.userId,
          lineName: this.activeContact.profile.name,
          imageProfile: `https://profile.line-scdn.net/${this.activeContact.profile.iconHash}/preview`,


          title: [null, Validators.required],
          firstName: [null, Validators.required],
          lastName: [null, Validators.required],
          tel: ['', [Validators.required, Validators.pattern(this.MOBILE_PATTERN)]],
          zip: ['', Validators.pattern(this.POSTCODE_PATTERN)],
          province: [''],
          district: [''],
          subDistrict: [''],
          street: [''],
          addr01: [null],

        });
      }

    })

  }




  async onSubmit(): Promise<void> {
    try {
      this.spinner.show();
      const payload = this.customer.getRawValue();
      payload.updated = new Date();
      console.log(payload);
      const res: any = await this.contactService.createContact(payload);
      if (res.data) {
        this.createOrder(res.data, payload.volumn);
      }
    } catch (error) {
      throw (error);
    } finally {

    }



  }



  createOrder(contact: any, volumn: number) {
    this.order = {
      customerId: contact._id,
      customerName: `${contact.title} ${contact.firstName} ${contact.lastName}`,
      channel: 'ขายหุ้น',
      items: [
        {
          productId: '000000',
          productName: 'ข้าเหนียว สันป่าตอง 5กก',
          unitPrice: 250,
          unitName: 'ถุง',
          isIncludeVat: false,
          vatPercent: 0,
          qty: volumn,
          totalAmount: 250,
          vatAmount: 0,
          discountAmount: 0,
          netAmount: 250
        },
        {
          productId: '000000',
          productName: 'ข้าวกล้อง 5กก',
          unitPrice: 250,
          unitName: 'ถุง',
          isIncludeVat: false,
          vatPercent: 0,
          qty: volumn,
          totalAmount: 250,
          vatAmount: 0,
          discountAmount: 0,
          netAmount: 250
        }
      ],
      totalAmount: 500,
      vatAmount: 0,
      discountAmount: 0,
      shipAmount: 25,
      netAmount: 525
    };
    console.log(this.order);
    // const res: any = this.orderService.createOrder(order)
    //   .then(async (res) => {
    //     this.spinner.hide();
    //     this.onSuccess.emit(res);

    //   })
    //   .catch((err) => { throw (err) })
  }



  updateFilter(event): void {

    //change search keyword to lower case
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function (d) {
      return d.postcode.toLowerCase().startsWith(val) === true || !val;
    });

    // update the rows
    this.postcodesList = temp;

    // console.log(this.postcodesList);
  }

  getPosts(val) {
    //12150 | บึงคำพร้อย | อำเภอลำลูกกา | ปทุมธานี

    let viewValue = val.viewValue;
    let arrValue = val.viewValue.split('|');
    let subdistrict = arrValue[1].trim();
    let district = arrValue[2].trim();
    let province = arrValue[3].trim();

    this.customer.controls['province'].setValue(province);
    this.customer.controls['district'].setValue(district);
    this.customer.controls['subDistrict'].setValue(subdistrict);
  }

}
