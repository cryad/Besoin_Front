import { Component, OnInit } from '@angular/core';
import { AuthServiceModule} from '../auth-service/auth-service.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  type: any = "";

  constructor(private auth: AuthServiceModule, private router: Router) { }



  ngOnInit(): void {
      if(!this.auth.isAuthenticated()) {
        this.router.navigateByUrl("/login")
      }

      this.type = this.auth.getType();
  }


}
