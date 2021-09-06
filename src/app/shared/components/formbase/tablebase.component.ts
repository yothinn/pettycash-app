import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { Formbase } from './formbase';
import { FormbaseService } from './formbase.service';
import { map, takeUntil } from 'rxjs/operators';
import { MatTable } from '@angular/material/table';

@Component({
    selector: 'app-tablebase',
    styleUrls: ['./tablebase.component.scss'],
    templateUrl: './tablebase.component.html'
})
export class TablebaseComponent {
    @Input() dataSource: any;
    @Input() table: any;

    @Output() onEditRow: EventEmitter<any> = new EventEmitter();
    @Output() onDeleteRow: EventEmitter<any> = new EventEmitter();
    @Output() onDownloadRow: EventEmitter<any> = new EventEmitter();
    @Output() onPageEventChanged: EventEmitter<any> = new EventEmitter();
    @Output() onSelectRow: EventEmitter<any> = new EventEmitter();
    private _unsubscribeAll: Subject<any>;

    constructor(private formBaseService: FormbaseService) {
        this._unsubscribeAll = new Subject();

    }

    ngOnInit(): void {
        this.formBaseService.lovGetheredObservable$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((lovData) => {
                this.table.columns.forEach(column => {
                    if (column.key === lovData.key) {
                        column.options = lovData.data;
                    }
                });
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }



    onEdit(row): void {
        this.onEditRow.emit(row);
    }

    onDelete(row): void {
        this.onDeleteRow.emit(row);
    }

    onDownload(row): void {
        this.onDownloadRow.emit(row);
    }

    onPageEvent($event): void {
        this.onPageEventChanged.emit($event);
    }

    onSelect(row): void { 
       this.onSelectRow.emit(row);
    }
}
