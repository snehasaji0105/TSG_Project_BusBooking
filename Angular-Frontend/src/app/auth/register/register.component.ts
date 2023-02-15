import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '@app/auth';
import { CredentialsService } from '@app/auth';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  error: string | undefined;
  registerForm!: FormGroup;
  isLoading = false;



  // private _toasterService: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private credentialService: CredentialsService,
    private toastr: ToastrService
  ) {
    this.createForm();
  }
  ngOnInit(): void {}
  register() {
  
    console.log(this.registerForm.value);
    this.authenticationService.register(this.registerForm.value).subscribe(
      (res) => {
        this.toastr.success('Registered successfully');
        this.router.navigate(['/login']);
      },
      (error: { error: { message: any } }) => {
        alert(error.error.message);
      }
    );
  }
  private createForm() {
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      name: ['', Validators.required],
    });
  }
  checkPasswords(group: FormGroup) {
    let pass = group.controls['password'].value;
    let confirmPass = group.controls['confirmPassword'].value;
    return pass == confirmPass ? null : { notSame: true };
  }

}
