import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ComptesComponent } from './comptes/comptes.component';
import { AdminComponent } from './admin/admin.component';
import { FinancierComponent } from './financier/financier.component';
import { CollabComponent } from './collab/collab.component';
import { DotationComponent } from './dotation/dotation.component';


const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "", component: HomeComponent},
  {path: "home", component: HomeComponent},
  {path: "comptes", component: ComptesComponent},
  {path: "admin", component: AdminComponent},
  {path: "financier", component: FinancierComponent},
  {path: "collab", component: CollabComponent},
  {path: "dotation", component: DotationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
