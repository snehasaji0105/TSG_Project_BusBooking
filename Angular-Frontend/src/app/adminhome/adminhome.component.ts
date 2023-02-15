import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.scss'],
})
export class AdminhomeComponent implements OnInit {
  credentialService: any;

  constructor() {}

  ngOnInit(): void {}

  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.credentialService.clearCredentials();
    return of(true);
  }
}
