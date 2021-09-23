import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Match } from '../match';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes
} from '@angular/animations';


@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css'],
  animations: [
    trigger('swiperight', [
      state('normal', style({
        transform: 'translateX(0)'
      })),
      state('right', style({
        transform: 'translateX(100vw)'
      })),
      transition('normal => right', [
        animate('1s')
      ]),
      transition('right => normal', [
        animate('0s')
      ]),
    ]),
    trigger('swipeleft', [
      state('normal', style({
        transform: 'translateX(0)'
      })),
      state('left', style({
        transform: 'translateX(-100vw)'
      })),
      transition('normal => left', [
        animate('1s')
      ]),
      transition('left => normal', [
        animate('0s')
      ]),
    ]),
    trigger('fire', [
      state('normal', style({
        animation: 'none'
      })),
      state('fire', style({})),
      transition('normal => fire', [
        animate("3s", keyframes([
          style({ 'box-shadow': '-.1em 0 .3em #fefcc9, .1em -.1em .3em #feec85, -.2em -.2em .4em #ffae34, .2em -.3em .3em #ec760c, -.2em -.4em .4em #cd4606, .1em -.5em .7em #973716, .1em -.7em .7em #451b0e', offset: 0 }),
          style({ 'box-shadow': '.1em -.2em .5em #fefcc9, .15em 0 .4em #feec85, -.1em -.25em .5em #ffae34, .15em -.45em .5em #ec760c, -.1em -.5em .6em #cd4606, 0 -.8em .6em #973716, .2em -1em .8em #451b0e', offset: 0.45 }),
          style({ 'box-shadow': '-.1em 0 .3em #fefcc9, .1em -.1em .3em #feec85, -.2em -.2em .6em #ffae34, .2em -.3em .4em #ec760c, -.2em -.4em .7em #cd4606, .1em -.5em .7em #973716, .1em -.7em .9em #451b0e', offset: 0.7 }),
          style({ 'box-shadow': '-.1em -.2em .6em #fefcc9, -.15em 0 .6em #feec85, .1em -.25em .6em #ffae34, -.15em -.45em .5em #ec760c, .1em -.5em .6em #cd4606, 0 -.8em .6em #973716, -.2em -1em .8em #451b0e', offset: 1 })
        ]))
      ]),
      transition('fire => normal', [
        animate('1s')
      ]),
    ])

  ]
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
  matchingEmail = "";
  isMatched = false;

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
    fetch('http://localhost:3030/no').then(_ => {
      fetch('http://localhost:3030/see')
        .then(response => response.json())
        .then(card => {
          this.currentName = card.name;
          this.currentLang = card.language;
          this.currentImgId = card.imgId;
        });
    });
  }

  rightButton(): void {
    fetch('http://localhost:3030/trymatch')
      .then(response => response.json())
      .then(data => {
        if (data.match) {
          this.matchingEmail = data.email;
          this.isFire = true;
          this.isMatched = true;
        } else {
          this.isSwipeRight = true;
        }
      });
  }

  flipCard(match: Match): void {
    match.isFlipped = !match.isFlipped;
  }

  swipeRightDone() {
    this.isSwipeRight = false;
    // Get next card
    fetch('http://localhost:3030/see')
      .then(response => response.json())
      .then(newcard => {
        this.currentName = newcard.name;
        this.currentLang = newcard.language;
        this.currentImgId = newcard.imgId;
      });
  }

  swipeLeftDone() {
    this.isSwipeLeft = false;
  }

  fireDone() {
    if (this.isMatched) {
      this.matches.push({
        name: this.currentName,
        language: this.currentLang,
        imgId: this.currentImgId,
        email: this.matchingEmail,
        isFlipped: false
      });

      this.isFire = false;
      // Get next card
      fetch('http://localhost:3030/see')
        .then(response => response.json())
        .then(newcard => {
          this.currentName = newcard.name;
          this.currentLang = newcard.language;
          this.currentImgId = newcard.imgId;
          this.isMatched = false;
        });
    }
  }
}
