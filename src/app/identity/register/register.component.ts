import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  formGroup: FormGroup; // FormGroup is a class that tracks the value and validity state of a group of FormControl instances.
  constructor(private fb: FormBuilder) {} // FormBuilder is a service that helps to create reactive forms in Angular.
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
          Validators.minLength(6),
          Validators.pattern(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/),
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
}
