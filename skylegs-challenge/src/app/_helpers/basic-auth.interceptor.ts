import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
    constructor() { }

    /** Add authentication to a request to Skylegs url */
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // check if requested url is from the Skylegs demo.
        const isApiUrl = request.url.startsWith(environment.apiUrl);

        if (isApiUrl) {
            // prepare authstr : Encode base64 user:pass
            const authstr = btoa(environment.user + ':' + environment.pass);
            request = request.clone({
                setHeaders: {
                    Authorization: `Basic ${authstr}`
                }
            });
        }

        return next.handle(request);
    }
}