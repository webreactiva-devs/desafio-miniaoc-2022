
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { locationCodeKO, locationCodeOK, locationKO, locationOK, solutionKO, solutionOK } from 'src/assets/mocks/reto1';

import { MiniAOCService } from '../services/mini-aoc.service';
import { Reto1Component } from './reto1.component';

const miniAOCServiceMock = {
  getLocation$: () => of(locationOK),
  decodeLocation: () => solutionOK
};

describe('Reto1Component', () => {

  let component: Reto1Component;
  let fixture: ComponentFixture<Reto1Component>;
  let service: MiniAOCService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
      declarations: [
        Reto1Component
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(Reto1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(MiniAOCService);

  });

  it('getLocation OK', () => {
    component.getLocation(locationCodeOK);
    expect(component.location).toEqual(solutionOK);
  });

  it('getLocation KO', () => {
    component.location = solutionOK;
    spyOn(service, 'decodeLocation').and.callFake(() => solutionKO);
    spyOn(service, 'getLocation$').and.callFake(() => of(locationKO));
    spyOn(component, 'getLocation').and.callThrough();
    component.getLocation(locationCodeKO);
    expect(component.location).toEqual('');
  });

});
