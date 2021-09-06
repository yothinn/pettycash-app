import { AfterViewInit, EventEmitter, Component, Input, Output, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.scss']
})
export class ContactInfoComponent implements OnInit, AfterViewInit, OnChanges {
  // Contact infomation
  @Input() info: any;

  // Emit line chat id , fb id
  @Output() lineClick = new EventEmitter<string>();
  @Output() fbClick = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
    // console.log("fvdfgdfg");

  }

  ngAfterViewInit(): void {
    // console.log(this.info);
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log(changes);
    // console.log(this.info);
  }

  onLineClick(): void {
    // console.log(this.info?.lineUId);
    this.lineClick.emit(this.info?.lineUId);
  }

  // onFbClick(): void {
  //   this.fbClick.emit("test emit id");
  // }

}
