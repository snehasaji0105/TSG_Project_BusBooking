import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { UpdateBusRouteService } from './updatebusroute.service';

@Component({
  selector: 'app-updatebusroute',
  templateUrl: './updatebusroute.component.html',
  styleUrls: ['./updatebusroute.component.scss'],
})
export class UpdatebusrouteComponent implements OnInit {
  updateBusRouteForm!: FormGroup;
  busroute: any;
  credentialService: any;
  updateBusRouteService: any;

  constructor(
    private updateBusService: UpdateBusRouteService,
    private formBuilder: FormBuilder,
    private _router: Router
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.updateBusRouteService.getBusRoute().subscribe((response: any) => {
      console.log(response);
      this.busroute = response;
    });
  }
  updateBusRoute() {
    console.log(this.updateBusRouteForm.value);
    if (this.updateBusRouteForm.valid) {
      const reqObj = {
        bookedSeats: this.updateBusRouteForm.value.bookedSeats,
        journeyDate: this.updateBusRouteForm.value.journeyDate,
      };
      console.log('req', reqObj);

      this.updateBusService.updateBusRoute(reqObj).subscribe((response: any) => {
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
    this.updateBusRouteForm = this.formBuilder.group({
      bookedSeats: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      journeyDate: ['', Validators.required],
    });
  }
}
