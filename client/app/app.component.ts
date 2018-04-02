import { Component } from "@angular/core";

@Component({
  selector: "hra-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  constructor() {}

  get isAuthenticated(): boolean {
    return true;
  }
}
