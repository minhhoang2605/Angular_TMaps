import { Component, OnInit } from '@angular/core';
import { MapsService } from '../maps.service';
import { Map } from '../map.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  maps: Map[];

  constructor(private mapsService: MapsService) { }

  ngOnInit() {
    this.getMaps();
  }

  getMaps(): void {
    this.maps = this.mapsService.getMaps();
  }
}
