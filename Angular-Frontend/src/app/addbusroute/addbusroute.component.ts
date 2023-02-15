import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AddBusRouteService } from './addbusroute.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addbusroute',
  templateUrl: './addbusroute.component.html',
  styleUrls: ['./addbusroute.component.scss'],
})
export class AddBusRouteComponent implements OnInit {
  addBusRouteForm!: FormGroup;
  busroute: any;
  credentialService: any;
  constructor(
    private addBusRouteService: AddBusRouteService,
    private formBuilder: FormBuilder,
    private _router: Router,
    private toastr: ToastrService,
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.addBusRouteService.getBusRoute().subscribe((response: any) => {
      console.log(response);
      this.busroute = response;
    });
  }
  addBusRoute() {
    console.log(this.addBusRouteForm.value);
    if (this.addBusRouteForm.valid) {
      const reqObj = {
        bookedSeats: this.addBusRouteForm.value.bookedSeats,
        journeyDate: this.addBusRouteForm.value.journeyDate,
        busNumber: this.addBusRouteForm.value.busNumber,
      };
      console.log('req', reqObj);

      this.addBusRouteService.addBusRoute(reqObj).subscribe((response: any) => {
        console.log(response);
        this.toastr.success('Bus Route added successfully');
        this._router.navigate(['/busroutelist']);
      });
    }
  }

  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.credentialService.clearCredentials();
    return of(true);
  }
  private createForm() {
    this.addBusRouteForm = this.formBuilder.group({
      bookedSeats: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      journeyDate: ['', Validators.required],
      busNumber: ['', Validators.required],
    });
  }
}
