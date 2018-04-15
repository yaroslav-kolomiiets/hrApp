import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { AuthService } from "./core/services/auth.service";

@Component({
  selector: "hra-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  currentUser = null;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.currentUser = this.authService.currentUser;
  }

  get isAuthenticated(): boolean {
    return !!this.currentUser;
  }

  toggleMenu(snav) {
    if (this.currentUser) {
      snav.toggle();
    }
  }
}
