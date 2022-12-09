import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of, filter, Observable, tap } from 'rxjs';
import { LocationSC } from '../services/location-sc.interface';

@Injectable()
export class Reto3Interceptor implements HttpInterceptor {

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    if (request.urlWithParams.indexOf('reto/3') === -1) return next.handle(request);
   
    const checkpoint = request.body;

    return next.handle(request).pipe(
      filter((event) => event instanceof HttpResponse),
      tap({
        next: (response) => {
          this.processResponse(response, checkpoint)
        }
      }),
      catchError((error) => of(error))
    );
  
  }

  processResponse(response: any, checkpoint: any) {
    const location = response.body as LocationSC;
    if (location.status === true) {
      location.checkpoint = checkpoint.checkpoint;
    } else if (location.status !== undefined) {
      location.antiHackersMessage = location.status || '';
    }
  }
  
}
