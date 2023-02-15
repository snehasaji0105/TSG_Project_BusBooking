import { TestBed } from '@angular/core/testing';

import { AddBusRouteService } from './addbusroute.service';

describe('AddbusrouteService', () => {
  let service: AddBusRouteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddBusRouteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
