import { Component, OnInit } from '@angular/core';
import { AuthServiceModule } from '../auth-service/auth-service.module';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { hostUrl, MessageService } from 'src/message/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string = "";
  password: string = "";
  errorMessage: string = "";
  invalidLogin = false;
  typeCompte: any = "";





  constructor(private auth: AuthServiceModule, private router: Router,private http: HttpClient, private messageService: MessageService) {}

  ngOnInit(): void {
  }

  handleLogin() {
    this.messageService.sendMessage("login", {username: this.username, password: this.password}).subscribe(res => {
      console.log(res)
      if(res.status == "OK") {
        this.http.get(hostUrl+"type/"+res.data.codeCollab).subscribe(type => {
          this.typeCompte = type;
          this.auth.finalizeAuthentication(res.status, res.data, type)
          this.invalidLogin = false;
          this.router.navigateByUrl("/home")
        })

      } else {
        this.invalidLogin = true;
        this.errorMessage = res.data;
      }
    })
  }

}