import { Component, OnInit } from '@angular/core';
import {ActivatedRoute } from '@angular/router';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})

export class ProductDetailsComponent implements OnInit {
  product_id: Number = 0;
  product: any;
  loading: Boolean = true;

  constructor(private route: ActivatedRoute, private http: Http) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.product_id = params['product_id'];

      this.http.get('http://localhost:8000/api/product/getproductbyid?product_id=' + this.product_id).subscribe(
        result => {
          this.product = result.json();
          this.loading = false;
          console.log(result.json());
        },
        error => {
          console.log('Error!');
        }
      );
    });
  }

}
