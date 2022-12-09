import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { mergeMap, Observable, of } from 'rxjs';
import { LocationSC } from '../services/location-sc.interface';
import { MiniAOCService } from '../services/mini-aoc.service';

@Component({
  selector: 'app-reto3',
  templateUrl: './reto3.component.html',
  styleUrls: ['./reto3.component.scss']
})
export class Reto3Component implements OnInit {

  public coordinateX: number[] = [0, 1, 2, 3, 4, 5, 6];
  public coordinateY: number[] = [6, 5, 4, 3, 2, 1, 0];

  public resetCoordinates = true;
  
  public antiHackersMessage: string = '';
  public messageSuccess: string = '';

  public data$!: Observable<LocationSC>;

  public coordinates: string[] = [];

  public formLocation: FormGroup = this.fb.group({
    locationSignal: ['', [Validators.required, Validators.pattern('[A-Z0-9z]*')]],
    name: ['']
  });

  get locationSignal() {
    return this.formLocation.get('locationSignal') as FormControl;
  }

  get name() {
    return this.formLocation.get('name') as FormControl;
  }

  constructor(
    private miniAOCService: MiniAOCService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    for (let x = 0; x < 7; x++) {
      for (let y = 0; y < 7; y++) {
        this.coordinates.push(`{${x},${y}}`);
      }
    }
  }

  getLocation(signal: string): void {

    this.antiHackersMessage = '';
    this.messageSuccess = '';

    const checkpointsRed = document.querySelectorAll('.red');
    checkpointsRed.forEach((checkpointRed) => {
      checkpointRed.classList.remove('red');
    })

    of(...this.coordinates).pipe(
      mergeMap((coordinate) => {
        return this.miniAOCService.getCheckPoint$(coordinate, signal);
      })
    ).subscribe(data => {
      if (data.antiHackersMessage) {
        this.antiHackersMessage = data.antiHackersMessage;
      } else if (data.success) {
        this.messageSuccess =  data.message + '\nEnvía tu nombre y conseguirás un regalito y descubrir donde está SuperCoco';
      } else {
        const checkpoint = document.getElementById(data.checkpoint!);
        checkpoint?.classList.add('red');
      }
    });

  }

  getGift() {
    this.data$ = this.miniAOCService.getGift$(this.locationSignal.value, this.name.value).pipe();
  }

}
