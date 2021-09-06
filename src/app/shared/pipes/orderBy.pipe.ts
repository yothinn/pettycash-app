import { Pipe, PipeTransform } from '@angular/core';
import { Utils } from 'src/app/shared/utils/index';

@Pipe({name: 'orderby'})
export class OrderByPipe implements PipeTransform
{
    /**
     * Transform
     *
     * @param {any[]} mainArr
     * @param {string} searchText
     * @param {string} property
     * @returns {any}
     */
    transform(mainArr: any[],  prop: string): any
    {
        // console.log(mainArr);
        return mainArr.sort((a, b) => a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1);
    }
}
