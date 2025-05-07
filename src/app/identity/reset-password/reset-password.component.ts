import { Component, OnInit } from '@angular/core';
import { ResetPassword } from '../../shared/Models/ResetPassword';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IdentityService } from '../identity.service';

@Component({
  selector: 'app-reset-password',
  standalone: false,
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent implements OnInit {
  ResetValue = new ResetPassword();
  formGroup: FormGroup;
  constructor(
    private router: ActivatedRoute,
    private fb: FormBuilder,
    private _service: IdentityService,
    private route: Router
  ) {}
  ngOnInit(): void {
    this.router.queryParams.subscribe((params) => {
      this.ResetValue.email = params['email'];
      this.ResetValue.token = params['code'];
    });
    this.FormValidation(); // Call the form validation method to initialize the form group
  }
  FormValidation() {
    this.formGroup = this.fb.group(
      {
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(
              /^(?=.*[0-9])(?=.*[#$@!.\-])[A-Za-z\d#$@!.\-]{8,}$/
            ),
          ],
        ],
        confirmPassword: [
          '',
          [
            Validators.required,
            Validators.pattern(
              /^(?=.*[0-9])(?=.*[#$@!.\-])[A-Za-z\d#$@!.\-]{8,}$/
            ),
          ],
        ],
      },
      { validator: this.PasswordMatchValidation }
    );
  }

  PasswordMatchValidation(form: FormGroup) {
    const passwordControl = form.get('password');
    const confirmPasswordControl = form.get('confirmPassword');
    if (passwordControl?.value === confirmPasswordControl?.value) {
      confirmPasswordControl?.setErrors(null);
    } else {
      confirmPasswordControl?.setErrors({ passwordMisMatch: true });
    }
  }

  get _password() {
    return this.formGroup.get('password');
  }
  get _confirmPassword() {
    return this.formGroup.get('confirmPassword');
  }

  Submit() {
    if (this.formGroup.valid) {
      this.ResetValue.password = this.formGroup.value.password;
      this._service.resetPassword(this.ResetValue).subscribe({
        next: (value) => {
          console.log(value);
          this.route.navigateByUrl('/Account/Login');
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
