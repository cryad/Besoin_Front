import { Component, OnInit } from '@angular/core';
import { AuthServiceModule } from '../auth-service/auth-service.module';
import { Router } from '@angular/router';
import { MessageService } from 'src/message/message.service';
import { createAvatar } from '@dicebear/core';
import { micah } from '@dicebear/collection';

@Component({
  selector: 'app-dotation',
  templateUrl: './dotation.component.html',
  styleUrls: ['./dotation.component.scss']
})
export class DotationComponent implements OnInit{

  Collaborateurs: any;
  collaborateur: any;
  prenom: any;

  constructor(private auth: AuthServiceModule, private router: Router, private messageService: MessageService,) {
  }

  ngOnInit(): void {
    if(!this.auth.isAuthenticated()) {
      this.router.navigateByUrl("/login")
    }

    if(this.auth.getType() != "admin") {
      this.router.navigateByUrl("/home")
    }

    this.prenom = this.auth.getPrenom();

    this.getAllCollab();
  }
  
  getAllCollab() {
    this.messageService.sendGet("collab/all").subscribe(res => {
      this.Collaborateurs = res.data;
    })
  }

  //updateDotation
  updateDotation(col: any, dot: number) {
    this.messageService.sendPut("collab/updateDotation/"+col.codeCollab, {dotation: dot}).subscribe(res => {
      //update local
      this.Collaborateurs.forEach((element: any) => {
        if(element.codeCollab == col.codeCollab) {
          element.dotation = dot;
        }
      });
    })
  }


  getDiceBearAvatar(seed: string): string {
    const avatar = createAvatar(micah, {
      seed: seed,
    });
  
    const svg = avatar.toString();
  
    return 'data:image/svg+xml;base64,' + btoa(svg);
  }



}
