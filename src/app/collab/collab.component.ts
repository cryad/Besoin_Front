import { Component, OnInit } from '@angular/core';
import { AuthServiceModule } from '../auth-service/auth-service.module';
import { Router } from '@angular/router';
import { MessageService } from 'src/message/message.service';

@Component({
  selector: 'app-collab',
  templateUrl: './collab.component.html',
  styleUrls: ['./collab.component.scss']
})

export class CollabComponent implements OnInit {

  projets?: any;

  intituleProjet = "Intitule";
  budgetProjet = 0;
  codeCollab: any;
  selectedProjet: any;

  constructor(private auth: AuthServiceModule, private router: Router, private messageService: MessageService) {}

  ngOnInit(): void {
      if(!this.auth.isAuthenticated()) {
        this.router.navigateByUrl("/login");
      }
      
      this.codeCollab = this.auth.getCodeCollab()
      this.getProjetsByCollab(this.codeCollab);

}

getProjetsByCollab(codeCollab: any) {
  this.messageService.sendGet("projet/collab/"+this.codeCollab).subscribe(res => {
    console.log(this.codeCollab)
    console.log(res)
    this.projets = res.data;
    console.log(this.projets);
  })
}

}