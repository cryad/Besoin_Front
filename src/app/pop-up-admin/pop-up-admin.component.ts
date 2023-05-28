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
    adminInProjets: any[] = [];
    respoFinancierNotInProjets: any[] = [];
    respoFinancierInProjets: any[] = [];
    selectedOption: any;
    selectedRole: any;
    isValide: any;

    respoFinanciers: any;
    admins: any;


    dotation: number;


    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private messageService: MessageService) {
      this.isValide = data.isValide;
      this.projet = data;
      this.dotation = 0;
      this.isValide = data.isValide;
    }

    ngOnInit() {


      this.getAdminNotInProjet(this.projet.codeProjet);
      this.getAdminInProjet(this.projet.codeProjet);
      this.getRespoFinancierNotInProjet(this.projet.codeProjet);
      this.getRespoFinancierInProjet(this.projet.codeProjet);
      this.getCollaborateursInProjet(this.projet.codeProjet);
      this.getCollaborateursNotInProjet(this.projet.codeProjet);


    }


    //Get admin not in projet
    getAdminNotInProjet(codeProjet: any) {
      this.messageService.sendGet("admin/notIn/"+this.projet.codeProjet).subscribe(res => {
        this.adminNotInProjets = res.data;
      })
    }

    //get admin in projet
    getAdminInProjet(codeProjet: any) {
      this.messageService.sendGet("admin/In/"+this.projet.codeProjet).subscribe(res => {
        this.adminInProjets = res.data;
      })
    }


    //Get respo financier not in projet
    getRespoFinancierNotInProjet(codeProjet: any) {
      this.messageService.sendGet("respoFinancier/notIn/"+this.projet.codeProjet).subscribe(res => {
        this.respoFinancierNotInProjets = res.data;
      })
    }

    //Get respo financier in projet

    getRespoFinancierInProjet(codeProjet: any) {
      this.messageService.sendGet("respoFinancier/In/"+this.projet.codeProjet).subscribe(res => {
        this.respoFinancierInProjets = res.data;
      })
    }

    //Get collaborateurs in projet
    getCollaborateursInProjet(codeProjet: any) {
      this.messageService.sendGet("collab/In/"+this.projet.codeProjet).subscribe(res => {
        this.collaborateurs = res.data;
        this.collaborateurs = this.collaborateurs.filter((collaborateur: any) => !this.respoFinancierInProjets.some((responsableFinancier: any) => responsableFinancier.codeCollab === collaborateur.codeCollab));
        this.collaborateurs = this.collaborateurs.filter((collaborateur: any) => !this.adminInProjets.some((admin: any) => admin.codeCollab === collaborateur.codeCollab));
      })
    }



    //Get collaborateurs not in projet
    getCollaborateursNotInProjet(codeProjet: any) {
      this.messageService.sendGet("collab/notIn/"+this.projet.codeProjet).subscribe(res => {
        this.collabNotInProjets = res.data;
        this.collabNotInProjets = this.collabNotInProjets.filter((collaborateur: any) => !this.respoFinancierInProjets.some((responsableFinancier: any) => responsableFinancier.codeCollab === collaborateur.codeCollab));
        this.collabNotInProjets = this.collabNotInProjets.filter((collaborateur: any) => !this.adminInProjets.some((admin: any) => admin.codeCollab === collaborateur.codeCollab));
      })

      
    
    }


    addCollab() {
      this.messageService.sendPost("besoin/assign", {codeCollab: this.selectedOption.codeCollab, codeProjet: this.projet.codeProjet, montantB: -1}).subscribe(res => {

        this.getAdminNotInProjet(this.projet.codeProjet);
        this.getAdminInProjet(this.projet.codeProjet);
        this.getRespoFinancierNotInProjet(this.projet.codeProjet);
        this.getRespoFinancierInProjet(this.projet.codeProjet);
        this.getCollaborateursNotInProjet(this.projet.codeProjet);
        this.getCollaborateursInProjet(this.projet.codeProjet);


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
