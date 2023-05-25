import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessageService } from 'src/message/message.service';

@Component({
  selector: 'app-pop-up-besoin',
  templateUrl: './pop-up-besoin.component.html',
  styleUrls: ['./pop-up-besoin.component.scss']
})
export class PopUpBesoinComponent implements OnInit{
  
  codeProjet?: number;
  Besoins?: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private messageService: MessageService) {
    this.codeProjet = data.codeProjet;

  }
  
  ngOnInit() {
    this.getBesoinsByProjet(this.codeProjet);
  }

  getBesoinsByProjet(codeProjet: any) {
    this.messageService.sendGet("besoin/byProjet/"+this.codeProjet).subscribe(res => {
      this.Besoins = res.data;
      console.log(this.Besoins);
    })
  }

  validateBesoin(selectedBesoin: any) {
    this.messageService.sendPut("besoin/validate/"+selectedBesoin.codeBesoin, {}).subscribe(res => {
      console.log(res)

      this.getBesoinsByProjet(this.codeProjet);
      /*
      this.Besoins.forEach((besoin: any) => {
        if(besoin.codeBesoin == selectedBesoin.codeBesoin) {
          besoin.valideB = true;
        }
      });
      */
    })
  }

}
