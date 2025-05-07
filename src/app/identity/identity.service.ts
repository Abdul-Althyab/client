import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { ActiveAccount } from '../shared/Models/ActiveAccount';

@Injectable({
  providedIn: 'root',
})
export class IdentityService {
  baseURL = environment.baseURL;
  constructor(private http: HttpClient) {}
  registerUser(user: any) {
    return this.http.post(this.baseURL + 'Account/Register', user);
  }
  activeAccount(param: ActiveAccount){
    return this.http.post(this.baseURL + 'Account/active-account', param);

  }
  loginUser(userForm: any) {
    return this.http.post(this.baseURL + 'Account/Login', userForm);
  }
  forgotPassword(email: string) {
    return this.http.get(this.baseURL + `Account/send-email-forget-password?email=${email}`);
  }
}
