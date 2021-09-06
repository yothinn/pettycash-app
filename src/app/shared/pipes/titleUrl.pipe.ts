import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'titleurl' })
export class TitleURLPipe implements PipeTransform {
    /**
     * Transform
     *
     * @param {string} value
     * @param {any[]} args
     * @returns {string}
     */
    transform(value: string, args: any[] = []): string {
        let result = '';

        if (value && value !== 'null') {
            const urlObj = JSON.parse(value);
            const arrUrl = urlObj.url.split('/');
            result = arrUrl[1];
        }

        return result;
    }
}
