import { CommonModule } from "@angular/common";
import { NgModule, Optional, SkipSelf } from "@angular/core";

import { SharedModule } from "../../shared/shared.module";
import { LoginRoutingModule, routedComponents } from "./login-routing.module";

@NgModule({
  imports: [CommonModule, SharedModule, LoginRoutingModule],
  declarations: [routedComponents]
})
export class LoginModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: LoginModule
  ) {
    if (parentModule) {
      throw new Error(`${LoginModule.constructor} is already loaded.`);
    }
  }
}
