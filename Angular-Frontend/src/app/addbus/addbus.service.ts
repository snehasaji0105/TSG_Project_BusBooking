import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CredentialsService } from '@app/auth';
import { Observable, of } from 'rxjs';

export interface AddBusContext {
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
export class AddBusService {
  constructor(private http: HttpClient, private credentialService: CredentialsService) {}
  getBus(): Observable<any> {
    return this.http.get('/api/bus/get-bus', {
      headers: { Authorization: `Bearer ${sessionStorage.getItem('credentials')}` },
    });
  }
  addBus(requestObj: AddBusContext): Observable<any> {
    console.log(sessionStorage.getItem('credentials'));
    return this.http.post('/api/bus/add-bus', requestObj, {
      headers: { Authorization: `Bearer ${sessionStorage.getItem('credentials')}` },
    });
  }
}
