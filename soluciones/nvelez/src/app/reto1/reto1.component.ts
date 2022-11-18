import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LocationSC } from '../services/location-sc.interface';
import { MiniAOCService } from '../services/mini-aoc.service';

@Component({
  selector: 'app-reto1',
  templateUrl: './reto1.component.html',
  styleUrls: ['./reto1.component.scss']
})
export class Reto1Component {

  public loader = false;

  public data!: LocationSC;
  public location: string = '';

  public formLocation: FormGroup = this.fb.group({
    locationCode: ['', [Validators.required, Validators.pattern('[A-Z ]*')]]
  });

  get locationCode() {
    return this.formLocation.get('locationCode') as FormControl;
  }
  
  constructor(
    private miniAOCService: MiniAOCService,
    private fb: FormBuilder
  ) { }
  
  getLocation(code: string): void {

    this.loader = true;
    this.location = '';

    const locationDecode = this.miniAOCService.decodeLocation(code);
    
    this.miniAOCService.getLocation$(locationDecode)
      .subscribe((data) => {
        this.data = data;
        if (data.supercoco_is_here) {
          this.location = locationDecode;
          this.locationCode.setValue('');
        } 
        this.loader = false;
      });
    
  }

}
