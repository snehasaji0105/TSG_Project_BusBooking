import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CredentialsService } from '@app/auth';
import { Observable } from 'rxjs';

export interface UpdateBusRouteContext {
  bookedSeats: number;
  journeyDate: string;

  // remember?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class UpdateBusRouteService {
  constructor(private http: HttpClient, private credentialService: CredentialsService) {}
  getBusRoute(): Observable<any> {
    return this.http.get('api/route/get-busroute', {
      headers: { Authorization: `Bearer ${this.credentialService.credentials}` },
    });
  }
  updateBusRoute(requestObj: UpdateBusRouteContext): Observable<any> {
    return this.http.put('/api/bus/update-busroute', requestObj, {
      headers: { Authorization: `Bearer ${this.credentialService.credentials}` },
    });
  }
}
