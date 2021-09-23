import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() name: String = "";
  @Input() language: String = "";
  @Input() imageid: Number = 0;
  @Input() email: String = "";
  @Input() ismatched: Boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
