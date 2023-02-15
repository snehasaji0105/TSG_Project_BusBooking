import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CredentialsService } from '@app/auth';
import { Observable } from 'rxjs';

export interface UpdateBusContext {
  busName: string;
  busNumber: string;
  routeDestination: string;
  routeSource: string;
  totalSeats: number;
  // remember?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class UpdatebusService {
  constructor(private http: HttpClient, private credentialService: CredentialsService) {}
  getBus(): Observable<any> {
    return this.http.get('/api/bus/get-bus', {
      headers: { Authorization: `Bearer ${this.credentialService.credentials}` },
    });
  }
  updateBus(requestObj: UpdateBusContext): Observable<any> {
    return this.http.put('/api/bus/update-bus', requestObj, {
      headers: { Authorization: `Bearer ${this.credentialService.credentials}` },
    });
  }
}
