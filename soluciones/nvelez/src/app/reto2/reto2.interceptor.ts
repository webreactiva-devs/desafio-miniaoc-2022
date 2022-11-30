import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, filter, Observable, of, tap } from 'rxjs';
import { LocationSC } from '../services/location-sc.interface';

@Injectable()
export class Reto2Interceptor implements HttpInterceptor {

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    if (request.urlWithParams.indexOf('reto/2') === -1) return next.handle(request);
   
    const location = request.body;

    return next.handle(request).pipe(
      filter((event) => event instanceof HttpResponse),
      tap({
        next: (response) => {
          this.processResponse(response, location)
        }
      }),
      catchError((error) => of(error))
    );
  
  }

  processResponse(response: any, location: any) {
    const status = response.body as LocationSC;
    if (status.supercoco_is_here) {
      status.location = location.solution;
    }
  }
  
}
