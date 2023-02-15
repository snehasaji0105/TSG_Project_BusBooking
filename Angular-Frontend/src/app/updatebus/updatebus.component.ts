import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { UpdatebusService } from './updatebus.service';

@Component({
  selector: 'app-updatebus',
  templateUrl: './updatebus.component.html',
  styleUrls: ['./updatebus.component.scss'],
})
export class UpdatebusComponent implements OnInit {
  updateBusForm!: FormGroup;
  bus: any;
  credentialService: any;

  constructor(private updateBusService: UpdatebusService, private formBuilder: FormBuilder, private _router: Router) {
    this.createForm();
  }

  ngOnInit(): void {
    this.updateBusService.getBus().subscribe((response: any) => {
      console.log(response);
      this.bus = response;
    });
  }
  updateBus(busId: any) {
    console.log(this.updateBusForm.value);
    alert(`Bus updated id ${busId}`);

    if (this.updateBusForm.valid) {
      const reqObj = {
        busName: this.updateBusForm.value.busName,
        busNumber: this.updateBusForm.value.busNumber,
        routeDestination: this.updateBusForm.value.routeDestination,
        routeSource: this.updateBusForm.value.routeSource,
        totalSeats: this.updateBusForm.value.totalSeats,
      };
      console.log('req', reqObj);

      this.updateBusService.updateBus(reqObj).subscribe((response: any) => {
        console.log(response);
        this._router.navigate(['/buslist']);
      });
    }
  }

  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.credentialService.clearCredentials();
    return of(true);
  }
  private createForm() {
    this.updateBusForm = this.formBuilder.group(
      {
        busName: ['', Validators.required],
        busNumber: ['', Validators.required],
        routeDestination: ['', Validators.required],
        routeSource: ['', Validators.required],
        totalSeats: ['', Validators.required],
      },
      this.validateRouteSourceAndDestination
    );
  }
  validateRouteSourceAndDestination(form: FormGroup) {
    const source = form.get('routeSource')!.value;
    const destination = form.get('routeDestination')!.value;

    if (source === destination) {
      return { sourceDestinationMatch: true };
    }
    return null;
  }
}
