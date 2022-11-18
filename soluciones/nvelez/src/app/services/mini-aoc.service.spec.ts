import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { MiniAOCService } from './mini-aoc.service';
import { LocationSC } from './location-sc.interface';
import { environment } from 'src/environments/environment.prod';
import { locationOK, locationKO, solutionOK, solutionKO, locationCodeOK } from 'src/assets/mocks/reto1';

describe('MiniAOCService', () => {
  
  let service: MiniAOCService;
  let httpMock : HttpTestingController;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        MiniAOCService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });

    service = TestBed.inject(MiniAOCService);
    httpMock = TestBed.inject(HttpTestingController);

  });

  it('decodeLocation', () => {
    const decodeLocation = service.decodeLocation(locationCodeOK);
    expect(decodeLocation).toBe(solutionOK);
  });

  it('getLocation$ OK return the location of supercoco', () => {
    service.getLocation$(solutionOK).subscribe((resp: LocationSC) => {
      expect(resp).toEqual(locationOK);
    });
    const req = httpMock.expectOne(environment.API_REST_URL + '/reto/1');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      solution: solutionOK
    });
    req.flush(locationOK);
  });

  it('getLocation$ KO "Intenténtalo de nuevo, malandriner nunca se rinde"', () => {
    service.getLocation$(solutionKO).subscribe((resp: LocationSC) => {
      expect(resp).toEqual(locationKO);
    });
    const req = httpMock.expectOne(environment.API_REST_URL + '/reto/1');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      solution: solutionKO
    });
    req.flush(locationKO);
  });

});
