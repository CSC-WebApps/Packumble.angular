import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Profile } from '../profile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile: Profile = {
    username: "",
    language: ""
  }

  languages: string[] = ['c#', 'python', 'javascript'];

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  startMatching(): void {
    fetch('http://localhost:3030/start', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "username": this.profile.username,
        "language": this.profile.language
      })
    })
      .then(response => response.json())
      .then(_ => {
        this.router.navigate([`/match/${this.profile.username}`]);
      })
  }

}
