import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ProgressbarService } from './progressbar.service';

@Component({
  selector: 'app-progressbar',
  templateUrl: './progressbar.component.html',
  styleUrls: ['./progressbar.component.scss']
})
export class ProgressbarComponent implements OnInit, OnDestroy {

  bufferValue: number;
  mode: 'determinate' | 'indeterminate' | 'buffer' | 'query';
  value: number;
  visible: boolean;

  // Private
  private unsubscribeAll: Subject<any>;

  constructor(private progressBarService: ProgressbarService) {
    // Set the defaults

    // Set the private defaults
    this.unsubscribeAll = new Subject();
  }


  ngOnInit(): void {

    // Subscribe to the progress bar service properties

    // Buffer value
    this.progressBarService.bufferValue
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((bufferValue) => {
        this.bufferValue = bufferValue;
      });

    // Mode
    this.progressBarService.mode
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((mode) => {
        this.mode = mode;
      });

    // Value
    this.progressBarService.value
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((value) => {
        this.value = value;
      });

    // Visible
    this.progressBarService.visible
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((visible) => {
        this.visible = visible;
      });

  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
}
