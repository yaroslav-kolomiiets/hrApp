import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { MatSidenav } from "@angular/material";

import { AuthService } from "./core/services/auth.service";

@Component({
  selector: "hra-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  currentUser: object | null = null;
  isDarkTheme = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.currentUser = this.authService.currentUser;
  }

  get isAuthenticated(): boolean {
    return !!this.currentUser;
  }

  toggleMenu(snav: MatSidenav) {
    if (this.currentUser) {
      snav.toggle();
    }
  }
}
