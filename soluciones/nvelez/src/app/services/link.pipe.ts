import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'link'
})
export class LinkPipe implements PipeTransform {

  transform(value: string): string {
    const link = value.substring(value.indexOf('https'));
    return link;
  }

}
