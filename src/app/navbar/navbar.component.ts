import { Component, OnInit } from '@angular/core';
import { AuthServiceModule } from '../auth-service/auth-service.module';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  type?: any;

  constructor(private auth: AuthServiceModule, private router: Router) {}

  ngOnInit(): void {
      this.type = this.auth.getType();
  }

  logout() {
    this.auth.logOut();
  }
}
