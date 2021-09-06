import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shotName'
})
export class ShotNamePipe implements PipeTransform {

  transform(name: string): string {
    return name ? name[0].toUpperCase() : '.';
  }

}
