import { Component, OnInit } from '@angular/core';
import { AuthServiceModule } from '../auth-service/auth-service.module';
import { Router } from '@angular/router';
import { MessageService } from 'src/message/message.service';
import { MatDialog } from '@angular/material/dialog';
import { PopUpAdminComponent } from '../pop-up-admin/pop-up-admin.component';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit{

  projets?: any;

  intituleProjet = "Intitule";
  budgetProjet = 0;

  closeResult?: string;


  constructor(
    private auth: AuthServiceModule,
    private router: Router,
    private messageService: MessageService,
    private dialogRef: MatDialog
    ) {}

  ngOnInit(): void {
    if(!this.auth.isAuthenticated()) {
      this.router.navigateByUrl("/login")
    }

    this.messageService.sendGet("projet/all").subscribe(res => {
      this.projets = res.data;
    })
  }

  addCollab() {
      this.messageService.sendPost("projet/add", {intituleProjet: this.intituleProjet, budgetProjet: this.budgetProjet}).subscribe(res => {
        this.projets.push(res.data);
        this.intituleProjet = "";
        this.budgetProjet = 0;
      })
    }

    openDialog(codeP: string) {
      this.dialogRef.open(PopUpAdminComponent, {
        data: {
          codeProjet: codeP
        }
      })
    }
  }


