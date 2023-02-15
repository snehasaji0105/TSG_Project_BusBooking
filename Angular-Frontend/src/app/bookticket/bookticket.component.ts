// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { Observable, of } from 'rxjs';

// @Component({
//   selector: 'app-bookticket',
//   templateUrl: './bookticket.component.html',
//   styleUrls: ['./bookticket.component.scss']
// })
// export class BookticketComponent implements OnInit {

//   bookTicketForm!: FormGroup;
//   ticket: any;
//   credentialService: any;
//    constructor(private bookTicketService :BookTicketService,private formBuilder: FormBuilder, private _router : Router) {
//      this.createForm()
//     }

//    ngOnInit(): void {
//      this.bookTicketService.getTicket().subscribe(
//        (response: any)=>{
//          console.log(response)
//          this.ticket = response
//        }
//      )
//    }
//    bookTicket(){  console.log(this.bookTicketForm.value)
//      if(this.bookTicketForm.valid){

//        const reqObj ={
//          "bookingDate":this.bookTicketForm.value.bookingDate,
//          "noOfPassengers":this.bookTicketForm.value.noOfPassengers,

//      }
//      console.log("req",reqObj)

//        this.bookTicketService. bookTicket(reqObj).subscribe(
//          (response:any)=>{
//            console.log(response)
//            this._router.navigate(['/ticketlist']);

//          }
//        )

//      }
//    }

//    logout(): Observable<boolean> {

//     this.credentialService.clearCredentials();
//     return of(true);
//   }
//    private createForm() {
//      this.bookTicketForm = this.formBuilder.group({
//       bookingDate: ['', Validators.required],
//       noOfPassengers: ['', Validators.required],

//      })
//    }
//   }
