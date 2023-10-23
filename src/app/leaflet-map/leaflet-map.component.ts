import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.gridlayer.googlemutant';
import 'node_modules/leaflet.browser.print/dist/leaflet.browser.print.min.js';

@Component({
  selector: 'app-leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.css'],
})
export class LeafletMapComponent implements OnInit {
  private map!: L.Map;

  ngOnInit() {
    this.initializeMap();
  }

  private initializeMap(): void {
    this.map = L.map('map', { attributionControl: false }).setView(
      [11.1619, 106.5938],
      8
    );

    //initial layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(
      this.map
    ); //this is working with print plugins

    // L.gridLayer
    //   .googleMutant({
    //     type: 'roadmap',
    //   })
    //   .addTo(this.map); //this is not working with print plugins

    //Layer controls
    const markerLayer = L.layerGroup().addTo(this.map);
    const polygonLayer = L.layerGroup().addTo(this.map);

    const marker1 = L.marker([11.1619, 106.5938], {}).bindPopup('This!!');
    markerLayer.addLayer(marker1);

    const polygon1 = L.polygon([
      [10.725381285457912, 106.01806640625001],
      [17.978733095556183, 106.01806640625001],
      [17.978733095556183, 115.31250000000001],
    ]);
    polygonLayer.addLayer(polygon1);

    const googleRoadmap = L.gridLayer.googleMutant({
      type: 'roadmap',
    });
    const openStreetMap = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    );

    const layers = {
      'Google Roadmap': googleRoadmap,
      'Open Street Map': openStreetMap,
    };

    const overlays = {
      Markers: markerLayer,
      Polygons: polygonLayer,
    };

    L.control.layers(layers, overlays).addTo(this.map);

    //print
    (L as any).control.browserPrint({ position: 'topleft' }).addTo(this.map);
  }
}
