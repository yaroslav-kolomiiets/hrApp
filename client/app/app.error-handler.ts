import { ErrorHandler } from "@angular/core/src/error_handler";

import { environment } from "../environments/environment";

export class AppErrorHandler implements ErrorHandler {
  handleError(error) {
    // TODO implement logger
    if (!environment.production) {
      console.warn(error);
    }
  }
}
