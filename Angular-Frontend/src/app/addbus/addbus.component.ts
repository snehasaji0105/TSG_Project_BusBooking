import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AddBusService } from './addbus.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addbus',
  templateUrl: './addbus.component.html',
  styleUrls: ['./addbus.component.scss'],
})
export class AddBusComponent implements OnInit {
  addBusForm!: FormGroup;
  bus: any;
  credentialService: any;
  constructor(private addBusService: AddBusService, private formBuilder: FormBuilder, private _router: Router,  private toastr: ToastrService) {
    this.createForm();
  }

  ngOnInit(): void {
    this.addBusService.getBus().subscribe((response: any) => {
      console.log(response);
      this.bus = response;
    });
  }
  addBus() {
    console.log(this.addBusForm.value);
    if (this.addBusForm.valid) {
      const reqObj = {
        busName: this.addBusForm.value.busName,
        busNumber: this.addBusForm.value.busNumber,
        routeDestination: this.addBusForm.value.routeDestination,
        routeSource: this.addBusForm.value.routeSource,
        totalSeats: this.addBusForm.value.totalSeats,
      };
      console.log('req', reqObj);

      this.addBusService.addBus(reqObj).subscribe((response: any) => {
        console.log(response);
        this.toastr.success('Bus added successfully');
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
    this.addBusForm = this.formBuilder.group(
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
