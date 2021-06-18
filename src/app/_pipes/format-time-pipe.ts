import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'formatTime' })
export class FormatTimePipe implements PipeTransform {
  transform(time: number) {
    let sec = Math.floor(time % 60);
    let min = Math.floor(time / 60) % 60;
    let hour = Math.floor(time / 3600) % 24;
    let secFormat = (sec < 10) ? "0" + sec : sec;
    let minFormat = (min < 10) ? "0" + min : min;
    let hourFormat = (hour < 10) ? "0" + hour : hour;
    return (hourFormat + ":" + minFormat + ":" + secFormat);
  }
}