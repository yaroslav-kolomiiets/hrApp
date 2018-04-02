import { APP_INITIALIZER } from "@angular/core";
import { AuthService } from "../services/auth.service";

export function auth(authService: AuthService) {
  return () => authService.auth();
}

export const appLoadProviders = [
  {
    provide: APP_INITIALIZER,
    useFactory: auth,
    deps: [AuthService],
    multi: true
  }
];
