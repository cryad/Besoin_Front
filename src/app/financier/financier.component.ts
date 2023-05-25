import { Component, OnInit } from '@angular/core';
import { AuthServiceModule } from '../auth-service/auth-service.module';
import { Router } from '@angular/router';
import { MessageService } from 'src/message/message.service';
import { MatDialog } from '@angular/material/dialog';
import { PopUpBesoinComponent } from '../pop-up-besoin/pop-up-besoin.component';

@Component({
  selector: 'app-financier',
  templateUrl: './financier.component.html',
  styleUrls: ['./financier.component.scss']
})
export class FinancierComponent implements OnInit{

  projets?: any;

  intituleProjet = "Intitule";
  budgetProjet = 0;
  codeCollab: any;
  selectedProjet: any;

  constructor(
    private auth: AuthServiceModule,
    private router: Router,
    private messageService: MessageService,
    private dialogRef: MatDialog,
    ) {}

  ngOnInit(): void {
    if(!this.auth.isAuthenticated()) {
      this.router.navigateByUrl("/login")
    }
    this.codeCollab = this.auth.getCodeCollab()
    console.log(this.codeCollab)

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

  validateProjet(selectedProjet: any) {
    this.messageService.sendPut("projet/validate/"+selectedProjet.codeProjet, {}).subscribe(res => {
      console.log(res)

      this.projets.forEach((projet: any) => {
        if(projet.codeProjet == selectedProjet.codeProjet) {
          projet.valideP = true;
        }
      });
    })
  }

  openDialog(codeP: string) {
    this.dialogRef.open(PopUpBesoinComponent, {
      data: {
        codeProjet: codeP
      }
    })
  }
}
