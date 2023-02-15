import { TestBed } from '@angular/core/testing';

import { UpdatebusrouteService } from './updatebusroute.service';

describe('UpdatebusrouteService', () => {
  let service: UpdatebusrouteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdatebusrouteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
