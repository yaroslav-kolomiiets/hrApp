import { ErrorHandler } from "@angular/core/src/error_handler";

import { environment } from "../environments/environment";

export class AppErrorHandler implements ErrorHandler {
  handleError(error: any) {
    if (!environment.production) {
      console.warn(error);
    }
  }
}
