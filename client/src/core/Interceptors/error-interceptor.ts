import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError } from 'rxjs';
import { ToastService } from '../services/toast-service';
import { Router, NavigationExtras } from '@angular/router';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(ToastService);
  const route = inject(Router);
  return next(req).pipe(
    catchError(err => {
      if (err) {
        switch (err.status) {
          case 400:
            if (err.error.errors) {
              const modelStateErros = [];
              for (const key in err.error.errors) {
                if (err.error.errors[key]) {
                  modelStateErros.push(err.error.errors[key]);
                }
              }
              throw  modelStateErros.flat();
            }
            else{
            toast.error(err.error)
            }
            break;
          case 401:
            toast.error('unauthorized')
            break;
          case 404:
            route.navigateByUrl('/not-found')
            break;
          case 500:
            const naviagationExtras : NavigationExtras = {state : {err : err.error}}
            route.navigateByUrl('/server-error',naviagationExtras)
            toast.error('internal server error')
            break;
          default:
            toast.error('something went wrong')
            break;
        }
      }
      throw err;
    })
  );
};
