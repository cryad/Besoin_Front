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
    Collaborateurs?: any;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private messageService: MessageService) {
      this.codeProjet = data.codeProjet;
    }

    ngOnInit() {
        this.messageService.sendGet("collab/In/"+this.codeProjet).subscribe(res => {
          this.Collaborateurs = res.data;
          console.log(this.Collaborateurs);
        })
    }
    

}
