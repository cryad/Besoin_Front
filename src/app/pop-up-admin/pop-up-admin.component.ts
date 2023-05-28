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
    isValide: any;
    dotation: number;

    //Celui qu'on ajoute
    selectedOption: any;

    //Le rôle
    selectedRole: any;

    //Récupération backend ceux qui ne sont pas dans le projet
    adminsNotInProjet: any[] = [];
    respoFinanciersNotInProjet: any[] = [];
    collabsNotInProjet: any[] = [];
    
    //Récupération backend ceux qui sont dans le projet
    adminsInProjet: any[] = [];
    respoFinanciersInProjet: any[] = [];
    collabsInProjet: any[] = [];



    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private messageService: MessageService) {

      this.isValide = data.isValide;
      this.projet = data;
      this.dotation = 0;

    }

    ngOnInit() {
      //Pas dans le projet
      this.getAdminsNotInProjet();
      this.getRespoFinanciersNotInProjet();
      this.getCollabsNotInProjet();

      //Dans le projet
      this.getAdminsInProjet();
      this.getRespoFinanciersInProjet();
      this.getCollabsInProjet();
    }

    getAdminsNotInProjet() {
      this.messageService.sendGet("admin/notIn/"+this.projet.codeProjet).subscribe(res => {
        this.adminsNotInProjet = res.data;
      })
    }

    getRespoFinanciersNotInProjet() {
      this.messageService.sendGet("respoFinancier/notIn/"+this.projet.codeProjet).subscribe(res => {
        this.respoFinanciersNotInProjet = res.data;
      })
    }

    getCollabsNotInProjet() {
      this.messageService.sendGet("collab/notIn/"+this.projet.codeProjet).subscribe(res => {
        this.collabsNotInProjet = res.data;
      })
    }

    getAdminsInProjet() {
      this.messageService.sendGet("admin/In/"+this.projet.codeProjet).subscribe(res => {
        this.adminsInProjet = res.data
      })
    }

    getRespoFinanciersInProjet() {
      this.messageService.sendGet("respoFinancier/In/"+this.projet.codeProjet).subscribe(res => {
        this.respoFinanciersInProjet = res.data
      })
    }

    getCollabsInProjet() {
      this.messageService.sendGet("collab/In/"+this.projet.codeProjet).subscribe(res => {
        this.collabsInProjet = res.data
      })
    }

    



    addCollab() {
      this.messageService.sendPost("besoin/assign", {codeCollab: this.selectedOption.codeCollab, codeProjet: this.projet.codeProjet, montantB: -1}).subscribe(res => {
        
        //Boolean qui permet de trouver le type
        const foundInCollab = this.collabsNotInProjet.find((collab) => collab.codeCollab === this.selectedOption.codeCollab);
        const foundInAdmin = this.adminsNotInProjet.find((admin) => admin.codeCollab === this.selectedOption.codeCollab);
        const foundInResponsableFinancier = this.respoFinanciersNotInProjet.find((responsableFinancier) => responsableFinancier.codeCollab === this.selectedOption.codeCollab);

        console.log(this.selectedOption)
        
        //Action local en fonction du type
        if(foundInAdmin) {

          this.adminsInProjet.push(this.selectedOption)
          this.adminsNotInProjet = this.adminsNotInProjet.filter((admin) => admin.codeCollab !== this.selectedOption.codeCollab);

        } else if(foundInResponsableFinancier) {

          this.respoFinanciersInProjet.push(this.selectedOption)
          this.respoFinanciersNotInProjet = this.respoFinanciersNotInProjet.filter((respoFinancier) => respoFinancier.codeCollab !== this.selectedOption.codeCollab);

        } else if(foundInCollab) {

          this.collabsInProjet.push(this.selectedOption)
          this.collabsNotInProjet = this.collabsNotInProjet.filter((collab) => collab.codeCollab !== this.selectedOption.codeCollab);

        }

      })
    }

    isAddActive(): boolean {
      // if(this.collabsNotInProjet.length === 0 && this.adminsNotInProjet.length == 0 && this.respoFinanciersNotInProjet.length == 0) {
      //   return true;
      // }
      // return false;
      return false;
    }



}
