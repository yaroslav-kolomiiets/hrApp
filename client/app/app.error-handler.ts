import { ErrorHandler } from "@angular/core/src/error_handler";

import { environment } from "../environments/environment";

export class AppErrorHandler implements ErrorHandler {
  handleError(error) {
    if (!environment.production) {
      console.warn(error);
    }
  }
}
