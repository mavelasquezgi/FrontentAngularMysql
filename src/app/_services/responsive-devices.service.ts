import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResponsiveDevicesService {

  private dievice = new BehaviorSubject('default data');
  dievice$ = this.dievice.asObservable();

  constructor() { }

  changeDevice(dievice: string){
    this.dievice.next(dievice)
  }
}
