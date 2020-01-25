import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../shared/services/user.service';

// import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }
  logOut() {
    this.userService.logout().subscribe(
      (resp: any) => {
                      localStorage.removeItem('token');
                      this.router.navigateByUrl('/login');
                     },
       err => {}
    );

 }
}
