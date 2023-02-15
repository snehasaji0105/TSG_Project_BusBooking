import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusroutelistComponent } from './busroutelist.component';

describe('BusroutelistComponent', () => {
  let component: BusroutelistComponent;
  let fixture: ComponentFixture<BusroutelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BusroutelistComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BusroutelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
