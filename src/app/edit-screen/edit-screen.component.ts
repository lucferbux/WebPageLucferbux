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
    {link: "introduction", image: "star_border", text: "Introducción"},
    {link: "team", image: "face", text: "¿Quién soy?"},
    {link: "projects", image: "business_center", text: "Proyectos"},
    {link: "patents", image: "border_color", text: "Articulos"},
    //{link: "media", image: "web", text: "Difusión"},
  ]

}
