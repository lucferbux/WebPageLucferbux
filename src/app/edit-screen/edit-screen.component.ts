import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-screen',
  templateUrl: './edit-screen.component.html',
  styleUrls: ['./edit-screen.component.css']
})
export class EditScreenComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  navLinks = [
    {link: "introduction", image: "lightbulb_outline", text: "¿Qué es ideas locas?"},
    {link: "team", image: "people", text: "¿Quiénes somos?"},
    {link: "projects", image: "business_center", text: "Proyectos"},
    {link: "patents", image: "pages", text: "Patentes"},
    {link: "media", image: "web", text: "Difusión"},
  ]

}
