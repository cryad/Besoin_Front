import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfilComponent } from './profil/profil.component';
import { ComptesComponent } from './comptes/comptes.component';
import { AdminComponent } from './admin/admin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PopUpAdminComponent } from './pop-up-admin/pop-up-admin.component';
import { FinancierComponent } from './financier/financier.component';
import { PopUpBesoinComponent } from './pop-up-besoin/pop-up-besoin.component';
import { CollabComponent } from './collab/collab.component';
import { DotationComponent } from './dotation/dotation.component';
import { PopUpCollabComponent } from './pop-up-collab/pop-up-collab.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    ProfilComponent,
    ComptesComponent,
    AdminComponent,
    PopUpAdminComponent,
    FinancierComponent,
    PopUpBesoinComponent,
    CollabComponent,
    DotationComponent,
    PopUpCollabComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
