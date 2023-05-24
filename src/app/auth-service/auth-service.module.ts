import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceModule {

  authentificated: boolean = false;

  constructor(private router: Router, private http: HttpClient) { }

  finalizeAuthentication(message: any, compte: any, type: any): void {
      this.authentificated = true;
      localStorage.setItem("codeCollab", compte["codeCollab"])
      localStorage.setItem("type", type["data"])
      localStorage.setItem("username", compte["username"])
      localStorage.setItem("nom", compte["nom"])
      localStorage.setItem("prenom", compte["prenom"])

      localStorage.setItem("authentificated", this.authentificated + "")

      console.log(this.authentificated)
  }

  isAuthenticated() {
    return localStorage.getItem("authentificated") == "true";
  }

  getCodeCollab() {
    return localStorage.getItem("codeCollab");
  }

  getType() {
    return localStorage.getItem("type")
  }
  
  getUsername() {
    return localStorage.getItem("username");
  }

  getNom() {
    return localStorage.getItem("nom");
  }

  getPrenom() {
    return localStorage.getItem("prenom");
  }

  logOut() {
    localStorage.clear();
    this.router.navigateByUrl("login")
  }
  
}