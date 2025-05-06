import { AfterViewChecked, AfterViewInit, Component } from '@angular/core';
import { ActiveAccount } from '../../shared/Models/ActiveAccount';
import { ActivatedRoute } from '@angular/router';
import { IdentityService } from '../identity.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-active',
  standalone: false,
  templateUrl: './active.component.html',
  styleUrl: './active.component.css',
})
export class ActiveComponent implements AfterViewInit {
  activeParam = new ActiveAccount();
    
  constructor(
    private router: ActivatedRoute,
    private _service: IdentityService,
    private toast: ToastrService
  ) {}
  ngAfterViewInit(): void {
    this.router.queryParams.subscribe((params) => {
      this.activeParam.email = params['email'];
      this.activeParam.token = params['code'];
    });
    this._service.activeAccount(this.activeParam).subscribe({
      next: (value) => {
        console.log(value);
        this.toast.success(
          'Your account has been activated successfully, you can now login',
          'SUCCESS'
        );
      },
      error: (err) => {
        console.log(err);
        this.toast.error(
          'Your account has not been activated,token is expire, please try again later',
          'ERROR'
        );
      },
    });
  }
}
