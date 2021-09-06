import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  subMenuActive: string;
  constructor() {
    // this._registerCustomChartJSPlugin();
  }

  ngOnInit(): void {
    

  }

  choosSubMenu(subMenu:string):void{
    this.subMenuActive = subMenu;
  }

}
