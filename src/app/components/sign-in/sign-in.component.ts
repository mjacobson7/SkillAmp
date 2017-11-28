import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  constructor(private http: Http) { }

  login(value) {
    console.log(value);
    this.http.post('/login', value).subscribe(response => {
      console.log(response);
    })
  }

  ngOnInit() {
  }

}
