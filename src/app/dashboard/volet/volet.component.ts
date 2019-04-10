import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate, state } from '@angular/animations';

@Component({
  selector: 'app-volet',
  templateUrl: './volet.component.html',
  styleUrls: ['./volet.component.css'],
  animations: [
    trigger('slideInOut', [
      state('leave', style({transform: 'translateY(-100%)'})),
      state('enter', style({transform: 'translateY(0%)'})),
      transition('leave <=> enter',
      animate('400ms ease-in')),
    ])
  ]
})
export class VoletComponent implements OnInit {

  show: boolean;

  constructor() {
    this.show = false;
  }

  toggle() {
    this.show = !this.show;
    console.log(this.show);
  }

  get stateName() {
    return this.show ? 'enter' : 'leave';
  }

  ngOnInit() {
  }

}
