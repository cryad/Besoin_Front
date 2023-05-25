import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessageService } from 'src/message/message.service';

@Component({
  selector: 'app-pop-up-admin',
  templateUrl: './pop-up-admin.component.html',
  styleUrls: ['./pop-up-admin.component.scss']
})
export class PopUpAdminComponent implements OnInit{

    codeProjet?: number;
    collaborateurs?: any;
    collabNotInProjets?: any;
    selectedOption?: any;


    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private messageService: MessageService) {
      this.codeProjet = data.codeProjet;
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

        this.collabNotInProjets.forEach((collabNotInProjet: any) => {
          if(collabNotInProjet.codeCollab == this.selectedOption.codeCollab) {
            this.collabNotInProjets.pop(collabNotInProjet);
            this.selectedOption = "Choissisez le collaborateur";
          }
        });

      }) 
    }


}
