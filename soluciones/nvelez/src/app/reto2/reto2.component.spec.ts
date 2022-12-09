import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { coordinateKO, coordinateOK, locationCodeKO, locationCodeOK, locationKO, locationOK } from 'src/assets/mocks/reto2';
import { MiniAOCService } from '../services/mini-aoc.service';

import { Reto2Component } from './reto2.component';

const miniAOCServiceMock = {
  getLocation$: () => of(locationOK),
  getCoordinates: () => of(coordinateOK)
};

describe('Reto2Component', () => {
  
  let component: Reto2Component;
  let fixture: ComponentFixture<Reto2Component>;
  let service: MiniAOCService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        {
          provide: MiniAOCService,
          useValue: miniAOCServiceMock
        }
      ],
      declarations: [Reto2Component],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(Reto2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(MiniAOCService);

  });

  xit('getLocation OK', () => {
    component.getLocation(locationCodeOK);
    expect(component.location$).toEqual(of(locationOK));
  });

  xit('getLocation KO', () => {
    component.location$ = of(locationOK);
    spyOn(service, 'getCoordinates').and.callFake(() => of(coordinateKO));
    spyOn(service, 'getLocation$').and.callFake(() => of(locationKO));
    spyOn(component, 'getLocation').and.callThrough();
    component.getLocation(locationCodeKO);
    expect(component.data$).toEqual(of(locationKO));
  });

});
