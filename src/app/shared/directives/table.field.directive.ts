import { Input } from '@angular/core';
import { Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[tableField]'
})
export class TableFieldDirective {
    private el: ElementRef;

    @Input('tableField') option: any;

    constructor(el: ElementRef) {
        // console.log(this.option);
        this.el = el;
    }

    ngOnInit(): void {
        // console.log(this.option);
        this.el.nativeElement.innerText = 'yellow'; 
    }

    ngAfterViewInit(): void {

    }
}