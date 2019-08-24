import { Component, OnInit, DoCheck } from '@angular/core';
import { Map } from '../map.model';
import { MapsService } from '../maps.service';
import { ActivatedRoute } from '@angular/router';
import { PinsService } from '../map-pins.service';
import { Pin } from '../pin.model';

@Component({
  selector: 'app-map-detail',
  templateUrl: './map-detail.component.html',
  styleUrls: ['./map-detail.component.css']
})

export class MapDetailComponent implements OnInit, DoCheck {
  map: Map;
  pins: Pin[];
  changeDetected = false;
  time: number;
  interval: any;

  constructor(
    private route: ActivatedRoute,
    private mapsService: MapsService,
    private pinsService: PinsService,
  ) { }

  ngOnInit() {
    this.getMap();
    this.setClock();
  }

  ngDoCheck() {
    const newMapId = +this.route.snapshot.paramMap.get('id');
    if (this.map.id !== newMapId) {
      this.getMap();
      this.setClock();
    }
  }

  getMap(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.map = this.mapsService.getMap(id);
    this.pins = this.pinsService.getPins(id);
  }

  addPinOnClick(event: any): void {
    const img = document.createElement('img');
    const myMap = document.getElementById('map-container');
    img.setAttribute('src', '../assets/Map-Marker.png');
    img.id = 'pin';
    img.style.zIndex = '9999';
    img.style.position = 'absolute';
    img.style.left = event.clientX - 12.5 - 250 + 'px';
    img.style.top = event.clientY - 25 - 60 + 'px';
    img.style.width = '25px';
    img.style.height = '25px';
    myMap.appendChild(img);
  }

  setClock(): void {
    this.time = 3000;
    clearInterval(this.interval);
  }

  runClock(): void {
    this.interval = setInterval(() => {
      this.time--;
      const minutes = Math.floor(this.time / 60);
      const seconds = Math.floor(this.time % 60);
      document.getElementById('timer').innerHTML
          = minutes + ':' + seconds;
    }, 1000);
  }
}
