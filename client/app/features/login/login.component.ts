import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "hra-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  hidePassword = true;
  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.createLoginForm();
  }

  private createLoginForm(): void {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(8)]],
      rememberMe: [false]
    });
  }
}
