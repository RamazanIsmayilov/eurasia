import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  const clonedRequest = req.clone({
    headers: req.headers
      .set('Authorization', `Bearer ${token}`)
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT'),
  });

  return next(clonedRequest).pipe(
    catchError((err) => {
      if (err.status === 401 || err.status === 403) {
        localStorage.clear();
        router.navigate(['/login']);
      }
      return throwError(() => err);
    })
  );
};
