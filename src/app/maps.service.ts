import { Injectable } from '@angular/core';
import { MAPS } from './mockmaps';
import { Map } from './map.model';

@Injectable({
  providedIn: 'root'
})
export class MapsService {
  maps: Map[];
  map: Map;

  constructor() { }

  getMaps(): Map[] {
    return this.maps = MAPS;
  }
  getMap(id: number): Map {
    return this.map = MAPS.find(map => map.id === id);
  }
}
