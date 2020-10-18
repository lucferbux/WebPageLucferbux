import { Component, Inject } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { isPlatformBrowser, isPlatformServer } from "@angular/common";
import { PLATFORM_ID } from "@angular/core";

@Component({
  selector: "landing-page",
  templateUrl: "./landing-page.component.html",
  styleUrls: ["./landing-page.component.scss"],
})
export class LandingPageComponent {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    @Inject(PLATFORM_ID) private platformId: string
  ) {
    const domain = isPlatformServer(platformId) ? "http://localhost:4200/" : "";
    this.matIconRegistry.addSvgIcon(
      "webpage",
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        domain + "assets/icon-webpage.svg"
      )
    );
  }

  goTwitter() {
    window.open("https://twitter.com/lucferbux", "_blank");
  }

  goLinkedin() {
    window.open("https://www.linkedin.com/in/lucferbux/", "_blank");
  }

  goGithub() {
    window.open("https://github.com/lucferbux", "_blank");
  }

  goCodepen() {
    window.open("https://codepen.io/lucferbux", "_blank");
  }
}
