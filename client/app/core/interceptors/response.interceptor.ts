import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import { Observable } from "rxjs/Observable";
import { tap } from "rxjs/operators/tap";

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(
        () => {},
        eventError => {
          console.error(`type eventError is: ${typeof eventError}`);

          if (eventError instanceof HttpErrorResponse) {
            if (!eventError.url || !eventError.url.includes("api")) {
              return;
            }

            console.warn(eventError.status);

            if (eventError.status >= 500) {
            } else {
              switch (eventError.status) {
                case 401:
                  if (!eventError.url.includes("login")) {
                    this.router.navigate(["/login"]).catch(err => {
                      console.warn(err);
                    });
                  }
                  break;

                case 403:
                  break;

                case 404:
                  break;

                case 419:
                  break;

                default:
                  break;
              }
            }
          }
        }
      )
    );
  }
}
