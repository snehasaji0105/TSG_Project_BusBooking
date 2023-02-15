// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { CredentialsService } from '@app/auth';
// import { Observable } from 'rxjs';

// export interface BookTicketContext {
//   bookingDate: string;
//   noOfPassengers: number;

// }

// @Injectable({
//   providedIn: 'root'
// })
// export class BookticketService {

//   constructor(private http : HttpClient, private credentialService:CredentialsService) { }
//   getTicket():Observable<any>{
//     return this.http.get('/api/ticket/get-ticket',{headers:{"Authorization": `Bearer ${sessionStorage.getItem("credentials")}`}})

//   }
//   bookTicket(requestObj: BookTicketContext ):Observable<any>{
//     console.log(sessionStorage.getItem("credentials"))
//     return this.http.post('/api/ticket/add-ticket', requestObj ,{headers:{"Authorization": `Bearer ${sessionStorage.getItem("credentials")}`}})
//   }

// }
