import { Component, OnInit } from '@angular/core';
import { AuthServiceModule} from '../auth-service/auth-service.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  type: any = "";
  displayText: string = '';
  texts: string[] = []
  currentIndex: number = 0;
  prenom: any;

  constructor(private auth: AuthServiceModule, private router: Router) { }



  ngOnInit(): void {
      if(!this.auth.isAuthenticated()) {
        this.router.navigateByUrl("/login")
      }
      this.prenom = this.auth.getPrenom();
      this.texts = ["Bienvenue "+this.prenom, "Désormais, vous pouvez gérer", "vos projets", "vos collaborateurs", "vos besoins", "en toute simplicité !"];
      this.type = this.auth.getType();
      this.startTyping();

  }

  startTyping() {
    const currentText = this.texts[this.currentIndex];
    this.typeText(currentText);
  }

  typeText(text: string) {
    if (text.length > 0) {
      this.displayText += text[0];
      setTimeout(() => this.typeText(text.slice(1)), 50); // Temps d'attente entre chaque caractère (en millisecondes)
    } else {
      setTimeout(() => this.startErasing(), 300); // Temps d'attente après avoir écrit tout le texte (en millisecondes)
    }
  }

  startErasing() {
    const currentText = this.texts[this.currentIndex];
    this.eraseText(currentText);
  }

  eraseText(text: string) {
    if (text.length > 0) {
      this.displayText = text.slice(0, text.length - 1);
      setTimeout(() => this.eraseText(text.slice(0, text.length - 1)), 10); // Temps d'attente entre chaque caractère effacé (en millisecondes)
    } else {
      this.currentIndex = (this.currentIndex + 1) % this.texts.length; // Passer au texte suivant
      setTimeout(() => this.startTyping(), 300); // Temps d'attente après avoir effacé tout le texte (en millisecondes)
    }
  }
}