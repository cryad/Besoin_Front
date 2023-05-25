import { Component, OnInit } from '@angular/core';
import { AuthServiceModule } from '../auth-service/auth-service.module';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { hostUrl, MessageService } from 'src/message/message.service';

@Component({
  selector: 'app-comptes',
  templateUrl: './comptes.component.html',
  styleUrls: ['./comptes.component.scss']
})
export class ComptesComponent implements OnInit{
  
  nom: string = "";
  prenom: string = "";
  username: string = "";
  password: string = "";
  type: any = "";
  errorMessage: string = "";
  invalidRegister = false;
  validRegister = false;


  constructor(private auth: AuthServiceModule, private router: Router,private http: HttpClient, private messageService: MessageService) { }

  ngOnInit(): void {
    this.validRegister = false;
    this.invalidRegister = false;
    if(!this.auth.isAuthenticated()) {
      this.router.navigateByUrl("/login")
    }
  }

    handleRegister() {
      this.messageService.sendPost("register", {nom: this.nom, prenom: this.prenom, username: this.username, password: this.password, discriminateur: this.type}).subscribe(res => {
        console.log(res.data)
        if(res.status == "OK") {
          this.http.get(hostUrl+"type/"+res.data.codeCollab).subscribe(collab => {
            console.log(collab)
            // reinitialiser les champs
            this.nom = "";
            this.prenom = "";
            this.username = "";
            this.password = "";
            this.type = "";
            this.invalidRegister = false;
            this.validRegister = true;
          })

        } else {
          this.validRegister = false;
          this.invalidRegister = true;
          this.errorMessage = res.data;
        }
      })
    }
  }

          

  
