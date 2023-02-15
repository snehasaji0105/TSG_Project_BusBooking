import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BusRouteListService } from './busroutelist.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-busroutelist',
  templateUrl: './busroutelist.component.html',
  styleUrls: ['./busroutelist.component.scss'],
})
export class BusroutelistComponent implements OnInit {
  credentialsService: any;
  data: any;
  constructor(private busroutelistService: BusRouteListService, private _router: Router, private toastr: ToastrService) 
    {}
  routes: any = [];
  auth: any;

  ngOnInit(): void {
    this.busroutelistService.getBusRouteList().subscribe((response: any) => {
      console.log(response);
      this.routes = response;
    });
  }

  updateBusRoute(id: any) {
    this.busroutelistService.updateBusRoute(id).subscribe((res: any) => {
      console.log(res);
    });
  }

  deleteBusRoute(routeId: any) {
    alert(`Are you sure you want to delete`);
  
    this.busroutelistService.deleteBusRoute(routeId).subscribe((res: any) => {
      this.data=res
      console.log(res);
      window.location.reload();
    });
    this.toastr.success('Deleted Successfully');
  }
  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.credentialsService.clearCredentials();
    return of(true);
  }
}
