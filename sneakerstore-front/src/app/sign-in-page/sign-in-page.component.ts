import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.css']
})
export class SignInPageComponent implements OnInit {
  email: string;
  password: string;

  constructor(private http: Http, private router: Router) {
  }

  ngOnInit() {
  }

  logIn() {
    const body = JSON.stringify({
      'email': this.email,
      'password': this.password
    });
    const hdr = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: hdr });
    this.http.post('http://localhost:8000/api/user/signin', body, options).subscribe(
      result => {
        localStorage.setItem('token', result.json().token);
        this.router.navigate(['/']);
        // sessionStorage.setItem('', ''); -> mau pake session storage juga bisa
        console.log(result.json().token);
      }, error => {

      }
    );
  }

}
