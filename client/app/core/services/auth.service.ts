import { HttpClient } from "@angular/common/http";
import { Injectable, Optional, SkipSelf } from "@angular/core";
import { isPlainObject } from "lodash-es";

import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { _throw } from "rxjs/observable/throw";
import { catchError } from "rxjs/operators/catchError";
import { map } from "rxjs/operators/map";

@Injectable()
export class AuthService {
  private curUser: null | object;
  private readonly authApi = {
    auth: "api/auth",
    login: "api/auth/login",
    logout: "api/auth/logout"
  };

  constructor(
    @Optional()
    @SkipSelf()
    private parentModule: AuthService,
    private httpClient: HttpClient
  ) {
    if (parentModule) {
      throw new Error(`${AuthService.constructor} is already loaded.`);
    }
  }

  get currentUser() {
    return this.curUser;
  }

  auth(): Observable<void> {
    return this.httpClient.get<object>(this.authApi.auth).pipe(
      map((user: object) => {
        if (isPlainObject(user)) {
          this.curUser = user;
        }
      }),
      catchError(() => {
        return of(undefined);
      })
    );
  }

  login() {
    console.log("login");
  }

  logout() {
    console.log("logout");
  }
}
