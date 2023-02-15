import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { BusListService } from './buslist.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-buslist',
  templateUrl: './buslist.component.html',
  styleUrls: ['./buslist.component.scss'],
})
export class BuslistComponent implements OnInit {
  credentialsService: any;

  constructor(private buslistService: BusListService, private _router: Router, private toastr: ToastrService) {}
  // private _router: any;
  buses: any = [];
  auth: any;

  ngOnInit(): void {
    this.buslistService.getBusList().subscribe((response: any) => {
      console.log(response);
      this.buses = response;
    });
  }

  updateBus(busId: any) {
    // this.buslistService.updateBus(busId).subscribe((res: any) => {
    //   console.log(res)

    // })
    console.log('busId', busId);
    this._router.navigate(['updatebus'], { queryParams: { id: busId } });
  }

  deleteBus(busId: any) {
    alert(`Are you sure you want to delete`);
    this.buslistService.deleteBus(busId).subscribe((res: any) => {
      console.log(res);

    });
    this.toastr.success('Deleted successfully');
  }
  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.credentialsService.clearCredentials();
    return of(true);
  }
}
