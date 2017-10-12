import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http'; // -> Untuk menambahkan Header di API dan 
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
   ProductList: object[] = [];

  constructor(private http: Http) { }

  ngOnInit() {
    // const token = localStorage.getItem('token');
    // console.log(token);
    // const hdr = new Headers({ 'Authorization' : 'Bearer ' + token });
    // const options = new RequestOptions({ headers: hdr });

    // this.http.get('http://localhost:8000/api/product/getallproduct', options).subscribe(
    //   result => {
    //     this.ProductList = result.json();
    //   },
    //   error => {
    //     console.log('Error!');
    //   }
    // );

    this.http.get('http://localhost:8000/api/product/getallproduct').subscribe(
      result => {
        this.ProductList = result.json();
      },
      error => {
        console.log('Error!');
      }
    );
  }

}
