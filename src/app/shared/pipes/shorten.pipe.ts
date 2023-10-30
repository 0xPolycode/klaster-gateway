import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform {

  transform(value: string, startLength: number, endLength: number, showElipsis = true): string {
    const start = value.substring(0, (startLength))
    const end = value.substring(
      (value.length - 1 - endLength),
      (value.length - 1)
    )
    const interfix = showElipsis ? '...' : ''
    return `${start}${interfix}${end}`
  }

}
