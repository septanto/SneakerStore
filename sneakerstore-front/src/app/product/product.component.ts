import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  file: FileList;
  product_id: Number = 0;

  constructor(private http: Http, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.product_id = params['product_id'];
      console.log(this.product_id);
    });
  }

  fileChange(evnt) {
    this.file = evnt.target.files; // set this.file bila ada change di FileList
    console.log(this.file); // return length 1
  }

  upload() {
    if (this.file.length > 0) {
      const myFile: File = this.file[0];
      const formData: FormData = new FormData();
      formData.append('image', myFile);
      formData.append('product_id', '1');

      const hd = new Headers();
      const options = new RequestOptions({ headers: hd });
      this.http.post('http://localhost:8000/api/product/saveproductimage', formData, options).subscribe(
        result => {},
        error => {}
      );
    }
  }
}
