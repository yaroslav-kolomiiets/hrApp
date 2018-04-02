import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule, Optional, SkipSelf } from "@angular/core";

import { appLoadProviders } from "./app-load";
import { httpInterceptorProviders } from "./interceptors";
import { coreProviders } from "./services";

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [httpInterceptorProviders, appLoadProviders, coreProviders],
  declarations: []
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error(`${CoreModule.constructor} is already loaded.`);
    }
  }
}
