import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { delay, finalize } from 'rxjs';
import { LoadingService } from '../Services/loading.service';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
  loadingService.show(); // Start the loading spinner
  return next(req).pipe(
    delay(1000), // Simulate a delay for demonstration purposes
    finalize(() => loadingService.hide())
  );
};
