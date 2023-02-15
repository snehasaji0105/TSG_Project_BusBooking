import { TestBed } from '@angular/core/testing';

import { UpdatebusService } from './updatebus.service';

describe('UpdatebusService', () => {
  let service: UpdatebusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdatebusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
