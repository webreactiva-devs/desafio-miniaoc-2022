import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeLink'
})
export class RemoveLinkPipe implements PipeTransform {

  transform(value: string): string {
    const text = value.substring(0, value.indexOf('https'));
    return text;
  }

}
