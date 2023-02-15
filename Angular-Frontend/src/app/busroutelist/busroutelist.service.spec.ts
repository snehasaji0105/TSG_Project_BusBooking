import { TestBed } from '@angular/core/testing';

import { BusRouteListService } from './busroutelist.service';

describe('BusroutelistService', () => {
  let service: BusRouteListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusRouteListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
