import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessageService } from 'src/message/message.service';

@Component({
  selector: 'app-pop-up-collab',
  templateUrl: './pop-up-collab.component.html',
  styleUrls: ['./pop-up-collab.component.scss']
})
export class PopUpCollabComponent {

  codeProjet: any;
  codeCollab: number;
  besoins: any;

  addDescriptionB?: string;
  addMontantB?: any;

  descriptionB?: string;
  montantB?: number;

  valideP: boolean;

  addErrorMessage = "";
  addSuccessMessage = "";

  modifyErrorMessage = "";
  modifySuccessMessage = "";


  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private messageService: MessageService) {
    this.codeProjet = data.codeProjet;
    this.codeCollab = data.codeCollab
    this.valideP = data.valideP
  }

  ngOnInit() {

    this.messageService.sendGet("besoin/byCollabProjet/"+this.codeProjet+"/"+this.codeCollab).subscribe(res => {

      console.log("codeProjet " + this.codeProjet)
      console.log("codeCollab " + this.codeCollab)

      this.besoins = res.data;

      console.log(this.besoins)

      this.besoins = this.besoins.filter((besoin: any) => besoin.montantB !== -1);
    })
 
  }

  addBesoin() {
    if(this.addMontantB == null || this.addDescriptionB == null) {
      this.addErrorMessage = "Vous devez remplir tout les champs"
    }  else {
        
        this.messageService.sendPost("besoin/add", {codeCollab: this.codeCollab, codeProjet: this.codeProjet, montantB: this.addMontantB, descriptionB: this.addDescriptionB, isValide: false}).subscribe(res => {

        if(res.status == "OK") {
          this.besoins.push(res.data)
          this.addMontantB = null;
          this.addDescriptionB = "";
          this.addErrorMessage = "";
          this.addSuccessMessage = "Besoin ajouté"
        }
        if(res.status == "ERROR") {
          this.addSuccessMessage = "";
          this.addErrorMessage = res.data
        }
      })
    }
  }

  updateBesoin(codeBesoin: number, descriptionB: string, montantB: number) {
    this.messageService.sendPut("besoin/update", {codeBesoin: codeBesoin, montantB: montantB, descriptionB: descriptionB}).subscribe(res => {
      if(res.status == "OK") {
        this.modifyErrorMessage = "";
        this.modifySuccessMessage = res.data;
      }

      if(res.status == "ERROR") {
        this.addSuccessMessage = "";
        this.modifyErrorMessage = res.data;
      }

    })
  }

  onDescriptionChange(besoin: any) {
    this.descriptionB = besoin.descriptionB
    console.log(this.descriptionB);
  }
  
  onMontantChange(besoin: any) {
    this.montantB = besoin.montantB
    console.log(this.montantB)
  }

}

