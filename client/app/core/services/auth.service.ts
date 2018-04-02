import { Injectable, Optional, SkipSelf } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {
  constructor(
    @Optional()
    @SkipSelf()
    private parentModule: AuthService,
    public httpClient: HttpClient
  ) {
    if (parentModule) {
      throw new Error(`${AuthService.constructor} is already loaded.`);
    }
  }

  auth() {
    // this.httpClient
    console.log("auth");
  }

  login() {
    console.log("login");
  }

  logout() {
    console.log("logout");
  }
}
