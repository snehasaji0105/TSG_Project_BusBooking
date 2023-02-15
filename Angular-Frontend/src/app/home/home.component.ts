import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { QuoteService } from './quote.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  quote: string | undefined;
  isLoading = false;
  credentialsService: any;
  busSearchService: any;
  searchForm: any;

  constructor(private quoteService: QuoteService) {}

  ngOnInit() {
    this.isLoading = true;
    this.quoteService
      .getRandomQuote({ category: 'dev' })
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((quote: string) => {
        this.quote = quote;
      });
  }

  // search() {
  //   const source = this.searchForm.value.source;
  //   const destination = this.searchForm.value.destination;
  //   const date = this.searchForm.value.date;
  

  // }

  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.credentialsService.clearCredentials();
    return of(true);
  }
}
