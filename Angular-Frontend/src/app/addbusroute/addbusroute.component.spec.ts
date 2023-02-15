import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBusRouteComponent } from './addbusroute.component';

describe('AddbusrouteComponent', () => {
  let component: AddBusRouteComponent;
  let fixture: ComponentFixture<AddBusRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddBusRouteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddBusRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
