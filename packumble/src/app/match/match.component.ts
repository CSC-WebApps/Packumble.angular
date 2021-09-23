import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Match } from '../match';


@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {

  username = "";
  currentName = "";
  currentLang = "";
  currentImgId = 0;
  matches: Match[] = [];
  isSwipeLeft = false;
  isSwipeRight = false;
  isFire = false;

  constructor(private route: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {
    this.username = String(this.route.snapshot.paramMap.get('username'));
    fetch('http://localhost:3030/see')
      .then(response => response.json())
      .then(card => {
        this.currentName = card.name;
        this.currentLang = card.language;
        this.currentImgId = card.imgId;
      });
  }

  goBack(): void {
    this.location.back();
  }

  leftButton(): void {
    this.isSwipeLeft = true;
    this.isSwipeRight = false;
    this.isFire = false;
    fetch('http://localhost:3030/no').then(_ => {
      fetch('http://localhost:3030/see')
        .then(response => response.json())
        .then(card => {
          this.syncDelay(300);
          this.currentName = card.name;
          this.currentLang = card.language;
          this.currentImgId = card.imgId;
          this.isSwipeLeft = false;
        });
    });
  }

  rightButton(): void {
    this.isSwipeLeft = false;
    this.isSwipeRight = false;
    this.isFire = false;
    fetch('http://localhost:3030/trymatch')
      .then(response => response.json())
      .then(data => {
        if (data.match) {
          this.isFire = true;
          this.matches.push({
            name: this.currentName,
            language: this.currentLang,
            imgId: this.currentImgId,
            email: data.email,
            isFlipped: false
          })
        } else {
          this.isSwipeRight = true;
        }

        // Get next card
        fetch('http://localhost:3030/see')
          .then(response => response.json())
          .then(newcard => {
            this.syncDelay(300);
            this.currentName = newcard.name;
            this.currentLang = newcard.language;
            this.currentImgId = newcard.imgId;
            this.isFire = false;
            this.isSwipeRight = false;
          });
      });
  }

  private syncDelay(milliseconds: Number): void {
    var start = new Date().getTime();
    var end = 0;
    while ((end - start) < milliseconds) {
      end = new Date().getTime();
    }
  }

  flipCard(match: Match): void {
    match.isFlipped = !match.isFlipped;
  }

}
