import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CredentialsService } from '@app/auth';
import { Observable } from 'rxjs';

export interface AddBusRouteContext {
  bookedSeats: number;
  journeyDate: string;
  busNumber: string;

  // remember?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AddBusRouteService {
  constructor(private http: HttpClient, private credentialService: CredentialsService) {}
  getBusRoute(): Observable<any> {
    return this.http.get('api/route/get-busRoute', {
      headers: { Authorization: `Bearer ${sessionStorage.getItem('credentials')}` },
    });
  }
  addBusRoute(requestObj: AddBusRouteContext): Observable<any> {
    return this.http.post('/api/route/add-busRoute', requestObj, {
      headers: { Authorization: `Bearer ${sessionStorage.getItem('credentials')}` },
    });
  }
}
