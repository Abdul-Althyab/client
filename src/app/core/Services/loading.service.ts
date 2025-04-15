import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  RequestCount = 0;
  constructor(private spinnerService: NgxSpinnerService) {}

  show() {
    this.RequestCount++;
    this.spinnerService.show(undefined, {
      bdColor: 'rgba(0, 0, 0, 0.6)',
      size: 'medium',
      color: '#fff',
      type: 'square-jelly-box',
      fullScreen: true,
    });
  }
  hide() {
    this.RequestCount--;
    if (this.RequestCount <= 0) {
      this.RequestCount = 0;
      this.spinnerService.hide();
    }
  }
}
