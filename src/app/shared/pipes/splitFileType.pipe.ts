import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'splitFileType'
})
export class SplitPipe implements PipeTransform {
    transform(val: string, params: string) {
        return (val.split(params))[1];
    }
}