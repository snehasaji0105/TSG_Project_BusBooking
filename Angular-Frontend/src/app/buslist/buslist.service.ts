import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CredentialsService } from '@app/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BusListService {
  // updateBus(id: any) {
  //   throw new Error('Method not implemented.');
  // }
  constructor(private http: HttpClient, private credentialService: CredentialsService) {}
  getBusList(): Observable<any> {
    return this.http.get<any>('http://localhost:8080/api/bus/get-bus', {
      headers: { Authorization: `Bearer ${sessionStorage.getItem('credentials')}` },
    });
  }
  updateBus(id: any): Observable<any> {
    return this.http.put<any>(`http://localhost:8080/api/bus/update-bus/${id}`, {
      headers: { Authorization: `Bearer ${sessionStorage.getItem('credentials')}` },
    });
  }

  deleteBus(id: any): Observable<any> {
    return this.http.delete<any>(`http://localhost:8080/api/bus/delete-bus/${id}`, {
      headers: { Authorization: `Bearer ${sessionStorage.getItem('credentials')}` },
    });
  }
}
