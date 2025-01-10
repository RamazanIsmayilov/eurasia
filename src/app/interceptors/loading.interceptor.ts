import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoaderService } from '../services/loader.service';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const busyService = inject(LoaderService)
  busyService.showLoader()
  return next(req).pipe(
    finalize(() => busyService.hideLoader())
  );
};
