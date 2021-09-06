import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'dateAgo',
    pure: true
})
export class DateAgoPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        if (value) {
            const seconds = Math.floor((+new Date() - +new Date(value)) / 1000);
            if (seconds < 29) // less than 30 seconds ago will show as 'Just now'
                return 'เมื่อสักครู่';
            const intervals = {
                'ปี': 31536000,
                'เดือน': 2592000,
                'อาทิตย์': 604800,
                'วัน': 86400,
                'ชั่วโมง': 3600,
                'นาที': 60,
                'วินาที': 1
            };
            let counter;
            for (const i in intervals) {
                counter = Math.floor(seconds / intervals[i]);
                if (counter > 0)
                    if (counter === 1) {
                        return counter + ' ' + i + 'ก่อน'; // singular (1 day ago)
                    } else {
                        return counter + ' ' + i + 'ก่อน'; // plural (2 days ago)
                    }
            }
        }
        return value;
    }

}