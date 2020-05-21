import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {


  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon(
      "webpage",
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/icon-webpage.svg")
    );
  }


  goTwitter() {
    window.open('https://twitter.com/lucferbux', "_blank");
  }   

  goLinkedin() {
    window.open('https://www.linkedin.com/in/lucferbux/', "_blank");
  }

  goGithub() {
    window.open('https://github.com/lucferbux', "_blank");
  }


}
