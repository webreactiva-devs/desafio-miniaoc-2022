import { Component } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { Coordinate, LocationSC } from '../services/location-sc.interface';
import { MiniAOCService } from '../services/mini-aoc.service';

@Component({
  selector: 'app-reto2',
  templateUrl: './reto2.component.html',
  styleUrls: ['./reto2.component.scss']
})
export class Reto2Component {

  public loader = false;
  public data: LocationSC = {};
  public location: string = '';
  public coordinates: Coordinate[] = [];

  public formLocation: FormGroup = this.fb.group({
    locationSignal: ['', [Validators.required, Validators.pattern('[0-9{}]*')]]
  });

  get locationSignal() {
    return this.formLocation.get('locationSignal') as FormControl;
  }
  
  constructor(
    private miniAOCService: MiniAOCService,
    private fb: FormBuilder
  ) { }

  getLocation(signal: string): void {
    
    this.data = {};
    this.location = '';

    this.coordinates = this.miniAOCService.getCoordinates(signal);

    for (const coordinate of this.coordinates) {
      
      const lat = coordinate.lat;
      const long = coordinate.long;

      this.miniAOCService.getLocation$(`{${lat},${long}}`, '2').subscribe((data: LocationSC) => {
        if (data.supercoco_is_here) {
          this.data = data;
          this.location = `{${lat},${long}}`;
          this.locationSignal.setValue('');
        } else if (!this.data.status) {
          this.data = data;
        }
      });

    }

  }

}
