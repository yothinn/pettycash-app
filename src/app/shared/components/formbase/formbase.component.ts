import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { Formbase } from './formbase';
import { FormbaseService } from './formbase.service';
import { map, startWith, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-formbase',
  templateUrl: './formbase.component.html'
})
export class FormbaseComponent {
  @Input() control: Formbase<string>;
  @Input() form: FormGroup;

  today = new Date();
  tomorrow = new Date(this.today.setDate(this.today.getDate()));
  filteredOptions: Array<any>;
  private _unsubscribeAll: Subject<any>;

  constructor(private formBaseService: FormbaseService) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    if (this.control.controlType === 'lookup' || this.control.controlType === 'autocomplete') {
      // console.log(this.control.controlType);
      this.formBaseService.lovGetheredObservable$
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((lovData) => {
          // console.log(lovData);
          // this.control.options = lovData;
          if (this.control.key === lovData.key) {
            this.control.options = lovData.data;
            if (this.control.controlType === 'autocomplete') {
              // this.filteredOptions = this.form.get(this.control.key).valueChanges.pipe(
              //   startWith(''),
              //   map(value => this._filter(value))
              // );
              this.form.get(this.control.key).valueChanges
                .pipe(startWith(''), map(value => this._filter(value, this.control.options)))
                .subscribe((options) => {
                  // console.log(data);
                  // console.log("df");
                  this.filteredOptions = options;
                })
            }
          }
        });
    }

  }

  private _filter(value: any, options: Array<any>): Array<any> {
    //console.log(value);
    if (value.name) {
      const filterValue = value.name.toLowerCase();

      return options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
    } else {
      const filterValue = value.toLowerCase();
      let match = options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
      if (match.length === 0) {
        return [{ id: 'new', name: `${value}` }]
      } else {
        return match;
      }

    }
  }

  public getDisplayFn() {
    return (val) => this.display(val);
  }
  private display(customer): string {
    //access component "this" here
    // console.log(customer);
    return customer ? customer.name : customer;
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
