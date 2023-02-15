import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Logger, UntilDestroy, untilDestroyed } from '@shared';
import { AuthenticationService } from '../authentication.service';
import { CredentialsService } from '../credentials.service';
import { ToastrService } from 'ngx-toastr';

const log = new Logger('Login');

@UntilDestroy()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  version: string | null = environment.version;
  error: string | undefined;
  loginForm!: FormGroup;
  isLoading = false;
  errTrue: boolean | undefined;
  respnse: any;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private _credentialService: CredentialsService,
    private toastr: ToastrService,
   
  ) {
    this.createForm();
  }

  ngOnInit() {}

  login() {
    if (this.loginForm.valid) {
      this.isLoading = true;

      console.log(this.loginForm.value);
      this.authenticationService.login(this.loginForm.value);
      console.log(this.loginForm.value);
      console.log('this.loginForm.valid', this.loginForm.value);
      this.authenticationService.login(this.loginForm.value).subscribe(
        (response: { role: any }) => {
          this.isLoading = false;
          console.log('response', response);
          this._credentialService.setCredentials(response);
          this.respnse = response;
          sessionStorage.setItem('credentials', this.respnse.token);
          log.debug(`${this.loginForm.value.email} successfully logged in`);
          this.toastr.success('Login successful!');
          if (response.role == 'ROLE_USER') {
          
            this.router.navigate(['/home']);
            
          } else {
           
            this.router.navigate(['/adminhome']);
          }
         
        },
        (error: any) => {
          this.isLoading = false;
          this.errTrue = true;
          console.log('response', error);
        }
      );
    }
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      // remember: true,
    });
  }
}
