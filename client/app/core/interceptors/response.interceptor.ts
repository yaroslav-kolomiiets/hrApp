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
    req: HttpRequest<object>,
    next: HttpHandler
  ): Observable<HttpEvent<object>> {
    return next.handle(req).pipe(
      tap(
        () => {},
        eventError => {
          if (eventError instanceof HttpErrorResponse) {
            if (!eventError.url || !eventError.url.includes("api")) {
              return;
            }

            if (eventError.status >= 500) {
              console.warn("eventError.status >= 500", eventError);
            } else {
              switch (eventError.status) {
                case 401:
                  if (!eventError.url.includes("login")) {
                    this.router.navigate(["/login"]).catch(err => {
                      console.warn(err);
                    });
                  } else {
                    console.warn("401", eventError);
                  }
                  break;

                case 403:
                  console.warn("403", eventError);
                  break;

                case 404:
                  console.warn("404", eventError);
                  break;

                case 419:
                  console.warn("419", eventError);
                  break;

                default:
                  console.warn("default", eventError);
                  break;
              }
            }
          }
        }
      )
    );
  }
}
