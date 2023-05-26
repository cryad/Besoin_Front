import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessageService } from 'src/message/message.service';

@Component({
  selector: 'app-pop-up-admin',
  templateUrl: './pop-up-admin.component.html',
  styleUrls: ['./pop-up-admin.component.scss']
})
export class PopUpAdminComponent implements OnInit{

    projet: any;
    collaborateurs: any;
    collabNotInProjets: any[] = [];
    selectedOption: any;

    addStatus = true;

    dotation: number;


    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private messageService: MessageService) {
      this.projet = data;
      this.dotation = 0;
    }

    ngOnInit() {

        this.messageService.sendGet("collab/In/"+this.projet.codeProjet).subscribe(res => {
          this.collaborateurs = res.data;
        })

        this.messageService.sendGet("collab/notIn/"+this.projet.codeProjet).subscribe(res => {
          console.log(res.data)
          this.collabNotInProjets = res.data;
        })
    }

    addCollab() {
      this.messageService.sendPost("besoin/assign", {codeCollab: this.selectedOption.codeCollab, codeProjet: this.projet.codeProjet, montantB: -1}).subscribe(res => {
        this.collaborateurs.push({codeCollab: this.selectedOption.codeCollab, nom: this.selectedOption.nom, prenom: this.selectedOption.prenom});

        this.collabNotInProjets = this.collabNotInProjets.filter((collabNotInProjet: any) => collabNotInProjet.codeCollab !== this.selectedOption.codeCollab);


      }) 
    }

    isAddActive(): boolean {
      if(this.collabNotInProjets.length === 0) {
        return true;
      }
      return false;
    }

    // calculer le budget restant qui est budget du projet - la somme des dotations des collaborateurs
    calculerBudgetRestant(): number {
      let budgetRestant = this.projet.budgetProjet;
      this.collaborateurs.forEach((collab: any) => {
        budgetRestant -= collab.dotation;
      })

      console.log("le projet : ", this.projet.codeProjet, " qui a le budget : ", this.projet.budgetProjet, " a le budget restant : ", budgetRestant);


      return budgetRestant;
    }


}
