import { Component } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Project_Needs_Management_Front';

  constructor(private route: ActivatedRoute, private router: Router) { }

  isLoginPage(): boolean {
    return this.router.url.includes('login');
  }
}


