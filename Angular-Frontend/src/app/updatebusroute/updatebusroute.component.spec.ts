import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatebusrouteComponent } from './updatebusroute.component';

describe('UpdatebusrouteComponent', () => {
  let component: UpdatebusrouteComponent;
  let fixture: ComponentFixture<UpdatebusrouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdatebusrouteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdatebusrouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
