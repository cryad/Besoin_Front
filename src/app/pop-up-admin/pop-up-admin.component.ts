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
    adminNotInProjets: any[] = [];
    respoFinancierNotInProjets: any[] = [];
    selectedOption: any;
    selectedRole: any;
    isValide: any;


    dotation: number;


    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private messageService: MessageService) {
      this.isValide = data.isValide;
      this.projet = data;
      this.dotation = 0;
      this.isValide = data.isValide;
    }

    ngOnInit() {

        this.messageService.sendGet("collab/In/"+this.projet.codeProjet).subscribe(res => {
          this.collaborateurs = res.data;
        })

        this.messageService.sendGet("collab/notIn/"+this.projet.codeProjet).subscribe(res => {
          console.log(res.data)
          this.collabNotInProjets = res.data;
        })

        this.messageService.sendGet("admin/notIn/"+this.projet.codeProjet).subscribe(res => {
          this.adminNotInProjets = res.data;
        })

        this.messageService.sendGet("respoFinancier/notIn/"+this.projet.codeProjet).subscribe(res => {
          this.respoFinancierNotInProjets = res.data;
        })

    }

    addCollab() {
      this.messageService.sendPost("besoin/assign", {codeCollab: this.selectedOption.codeCollab, codeProjet: this.projet.codeProjet, montantB: -1}).subscribe(res => {
        this.collaborateurs.push({codeCollab: this.selectedOption.codeCollab, nom: this.selectedOption.nom, prenom: this.selectedOption.prenom});

        this.collabNotInProjets = this.collabNotInProjets.filter((collabNotInProjet: any) => collabNotInProjet.codeCollab !== this.selectedOption.codeCollab);
        this.adminNotInProjets = this.adminNotInProjets.filter((adminNotInProjet: any) => adminNotInProjet.codeCollab !== this.selectedOption.codeCollab);
        this.respoFinancierNotInProjets = this.respoFinancierNotInProjets.filter((respoFinancierNotInProjet: any) => respoFinancierNotInProjet.codeCollab !== this.selectedOption.codeCollab);

        this.selectedOption = "";

      }) 
    }

    isAddActive(): boolean {
      if(this.collabNotInProjets.length === 0) {
        return true;
      }
      return false;
    }



}
