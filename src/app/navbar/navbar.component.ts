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


  logout() {
    this.auth.logOut();
  }
}
