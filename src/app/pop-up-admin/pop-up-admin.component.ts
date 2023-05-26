import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessageService } from 'src/message/message.service';

@Component({
  selector: 'app-pop-up-admin',
  templateUrl: './pop-up-admin.component.html',
  styleUrls: ['./pop-up-admin.component.scss']
})
export class PopUpAdminComponent implements OnInit{

    codeProjet: any;
    collaborateurs: any;
    collabNotInProjets: any[] = [];
    selectedOption: any;
    isValide: any;


    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private messageService: MessageService) {
      this.codeProjet = data.codeProjet;
      this.isValide = data.isValide;
    }

    ngOnInit() {

        this.messageService.sendGet("collab/In/"+this.codeProjet).subscribe(res => {
          this.collaborateurs = res.data;
        })

        this.messageService.sendGet("collab/notIn/"+this.codeProjet).subscribe(res => {
          console.log(res.data)
          this.collabNotInProjets = res.data;
        })
    }

    addCollab() {
      this.messageService.sendPost("besoin/assign", {codeCollab: this.selectedOption.codeCollab, codeProjet: this.codeProjet, montantB: -1}).subscribe(res => {
        this.collaborateurs.push({codeCollab: this.selectedOption.codeCollab, nom: this.selectedOption.nom, prenom: this.selectedOption.prenom});

        this.selectedOption = "";
        this.collabNotInProjets = this.collabNotInProjets.filter((collabNotInProjet: any) => collabNotInProjet.codeCollab !== this.selectedOption.codeCollab);


      }) 
    }

    isAddActive(): boolean {
      if(this.collabNotInProjets.length === 0) {
        return true;
      }
      return false;
    }


}
