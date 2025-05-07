import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IdentityService } from '../identity.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;
  emailModel: string = '';
  constructor(private fb: FormBuilder, private _service: IdentityService) {}
  ngOnInit(): void {
    this.FormValidation();
  }
  FormValidation() {
    this.formGroup = this.fb.group({
      Email: ['', [Validators.required, Validators.email]],
      Password: [
        '',
        [
          Validators.required, // The field is required
          Validators.minLength(8), // The password must be at least 8 characters long
          // The password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character
          Validators.pattern(
            '(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
          ),
        ],
      ],
    });
  }
  get Email() {
    return this.formGroup.get('Email');
  }
  get Password() {
    return this.formGroup.get('Password');
  }
  Submit() {
    if (this.formGroup.valid) {
      this._service.loginUser(this.formGroup.value).subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      console.log('Form is invalid');
    }
  }
  sendEmailForgetPassword() {
    this._service.forgotPassword(this.emailModel).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
