import { Injectable } from '@angular/core';
import { Pin } from './pin.model';

@Injectable({
  providedIn: 'root'
})
export class PinsService {
  pins: Pin[] = [];

  constructor() { }

  getPins(mapId: number): Pin[] {
    return this.pins.filter(pin => pin.mapId === mapId);
  }

  addPin(pin: Pin): void {
    pin.pinId = this.pins.length;
    this.pins.push(pin);
  }
}
