import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBusComponent } from './addbus.component';

describe('AddbusComponent', () => {
  let component: AddBusComponent;
  let fixture: ComponentFixture<AddBusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddBusComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddBusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
