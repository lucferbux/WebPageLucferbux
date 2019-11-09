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
    {link: "introduction", image: "home", text: "Introducción"},
    {link: "aboutme", image: "face", text: "¿Quién soy?"},
    {link: "projects", image: "business_center", text: "Proyectos"},
    {link: "posts", image: "border_color", text: "Articulos"}
  ]

}
