import { Component, OnInit } from '@angular/core';
import { AuthServiceModule } from '../auth-service/auth-service.module';
import { Router } from '@angular/router';
import { MessageService } from 'src/message/message.service';
import { createAvatar } from '@dicebear/core';
import { shapes } from '@dicebear/collection';
import { MatDialog } from '@angular/material/dialog';
import { PopUpCollabComponent } from '../pop-up-collab/pop-up-collab.component';

@Component({
  selector: 'app-collab',
  templateUrl: './collab.component.html',
  styleUrls: ['./collab.component.scss']
})

export class CollabComponent implements OnInit {

  projets?: any;

  intituleProjet = "Intitule";
  codeCollab: any;
  prenom: any;

  constructor(private auth: AuthServiceModule,
    private router: Router,
    private messageService: MessageService,
    private dialogRef: MatDialog) {}

  ngOnInit(): void {
      if(!this.auth.isAuthenticated()) {
        this.router.navigateByUrl("/login");
      }
      
      this.codeCollab = this.auth.getCodeCollab()
      this.prenom = this.auth.getPrenom()
      this.getProjetsByCollab(this.codeCollab);

}


getProjetsByCollab(codeCollab: any) {
  this.messageService.sendGet("projet/collab/"+this.codeCollab).subscribe(res => {
    this.projets = res.data;
  })
}

openDialog(codeP: any, valideP: any) {

  this.dialogRef.open(PopUpCollabComponent, {
    data: {
      codeProjet: codeP,
      codeCollab: this.codeCollab,
      valideP: valideP
    }
  })
}

getDiceBearAvatar(seed: string): string {
  const avatar = createAvatar(shapes, {
    seed: seed,
  });
  
  const svg = avatar.toString();

  return 'https://api.dicebear.com/6.x/shapes/svg?seed=' + btoa(svg);
}

}

