import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IdentityService } from '../identity.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  formGroup: FormGroup; // FormGroup is a class that tracks the value and validity state of a group of FormControl instances.
  constructor(
    private fb: FormBuilder,
    private identityService: IdentityService,
    private toast: ToastrService
  ) {} // FormBuilder is a service that helps to create reactive forms in Angular.
  ngOnInit(): void {
    this.formValidation();
  }

  formValidation() {
    this.formGroup = this.fb.group({
      UserName: ['', [Validators.required, Validators.minLength(3)]],
      Email: ['', [Validators.required, Validators.email]],
      Password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
          ),
        ],
      ],
      DisplayName: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  get UserName() {
    return this.formGroup.get('UserName');
  }
  get Email() {
    return this.formGroup.get('Email');
  }
  get Password() {
    return this.formGroup.get('Password');
  }
  get DisplayName() {
    return this.formGroup.get('DisplayName');
  }
  Submit() {
    if (this.formGroup.valid) {
      this.identityService.registerUser(this.formGroup.value).subscribe({
        next: (value) => {
          this.toast.success(
            'User registered successfully!, Please confirm your email!',
            'Success!'
          );
          this.formGroup.reset(); // Reset the form after successful registration
          console.log(value);
        },
        error: (error: any) => {
          this.toast.error(error.error.message, 'Error!');
          console.error(error);
        },
      });
    }
  }
}
