import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.css']
})
export class SignUpPageComponent implements OnInit {
  name: string;
  email: string;
  password: string;
  address: string;
  phone_number: string;

  constructor(private http: Http, private router: Router) { }

  ngOnInit() {
  }

  SignUp() {
    const body = JSON.stringify({
      'name': this.name,
      'email': this.email,
      'password': this.password,
      'address': this.address,
      'phone_number': this.phone_number
    });
    const hdr = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({ headers: hdr});
    this.http.post('http://localhost:8000/api/user/signup', body, options).subscribe(
      result => {
        this.router.navigate(['/']);
      }, error => {

      }
    );
  }
}
