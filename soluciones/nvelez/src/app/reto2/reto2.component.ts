import { Component } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { of, tap, mergeMap, Observable } from 'rxjs';
import { Coordinate, LocationSC } from '../services/location-sc.interface';
import { MiniAOCService } from '../services/mini-aoc.service';

@Component({
  selector: 'app-reto2',
  templateUrl: './reto2.component.html',
  styleUrls: ['./reto2.component.scss']
})
export class Reto2Component {

  public loader = false;
  public data$!: Observable<LocationSC>;
  public location$!: Observable<LocationSC> | null;
  public error$!: Observable<LocationSC> | null;
  public coordinates$!: Observable<Coordinate>;

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

    this.loader = true;
    this.error$ = null;
    this.location$ = null;
    this.coordinates$ = this.miniAOCService.getCoordinates(signal);

    this.data$ = this.coordinates$.pipe(
      mergeMap((coordinate) => {
        const lat = coordinate.lat;
        const long = coordinate.long;
        return this.miniAOCService.getLocation$(`{${lat},${long}}`, '2');
      })
    ).pipe(
      tap({
        next: (data: LocationSC) => {
          if (data.supercoco_is_here !== undefined) {
            this.location$ = of(data);
          } else {
            this.error$ = of(data);
          }
        },
        complete: () => {
          this.loader = false;
        }
      })
    )
    
  }

}
