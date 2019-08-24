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
    this.clearPins();
    this.renderPins();
  }

  addPinOnClick(event: any): void {
    var pin: Pin = {
      pinId: 0,
      mapId: this.map.id,
      x: event.clientX,
      y: event.clientY,
    };
    this.pinsService.addPin(pin);
    this.pins.push(pin);
    this.renderPins();
  }

  renderPins(): void {
    for(let pin of this.pins) {
      const img = document.createElement('img');
      const myMap = document.getElementById('map-container');
      img.setAttribute('src', '../assets/Map-Marker.png');
      img.setAttribute('class', 'pin');
      img.style.zIndex = '9999';
      img.style.position = 'absolute';
      img.style.left = pin.x - 12.5 - 250 + 'px';
      img.style.top = pin.y - 25 - 60 + 'px';
      img.style.width = '25px';
      img.style.height = '25px';
      myMap.appendChild(img);
    }
  }

  clearPins(): void {
    let temp_pins = document.getElementsByClassName('pin');
    while (temp_pins[0]) {
      temp_pins[0].parentNode.removeChild(temp_pins[0]);
    }
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
      if (this.time === 0) {
        document.getElementById('timer').innerHTML = 'EXTRACTED';
        clearInterval(this.interval);
      }
    }, 1000);
  }
}
