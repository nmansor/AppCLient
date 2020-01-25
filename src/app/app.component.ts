import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "./shared/models/User.model";
import { UserService } from "./shared/services/user.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})

export class AppComponent {
  currentUser: User;
  title = "webApp";
  constructor(
      private router: Router,
      private userService: UserService
  ) {}

  logout() {
      this.userService.logout();
      this.router.navigate(["/login"]);
  }
}
