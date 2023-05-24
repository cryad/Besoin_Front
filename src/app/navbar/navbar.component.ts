import { Component } from '@angular/core';
import { AuthServiceModule } from '../auth-service/auth-service.module';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(private auth: AuthServiceModule, private router: Router) {}

  menu_icon_variable: boolean = false;
  menuVariable: boolean = false;

  ngOnInit(): void {
  }
  openMenu() {
    this.menuVariable =! this.menuVariable;
    this.menu_icon_variable =! this.menu_icon_variable;
  }

  logout() {
    this.auth.logOut();
  }
}
