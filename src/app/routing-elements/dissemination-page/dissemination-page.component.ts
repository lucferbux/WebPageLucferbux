import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dissemination-page',
  templateUrl: './dissemination-page.component.html',
  styleUrls: ['./dissemination-page.component.css']
})
export class DisseminationPageComponent implements OnInit {

  topicData =  [{
    topic: "Charlas",
    data: [

    ]
  }, {
    topic: "Eventos",
    data: [

    ]
  },

  {
    topic: "Blog",
    data: [

    ]
  },
  
  ]


  

  constructor() { }

  ngOnInit() {
  }

}
