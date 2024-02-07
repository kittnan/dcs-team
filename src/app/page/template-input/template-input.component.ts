import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-template-input',
  templateUrl: './template-input.component.html',
  styleUrls: ['./template-input.component.scss']
})
export class TemplateInputComponent implements OnInit {

  options = [
    {
      itemName:'aaa',
      itemValue:'frghjk'
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
