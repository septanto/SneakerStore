import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { SignInPageComponent } from './sign-in-page/sign-in-page.component';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';
import { RouterModule } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    PageHeaderComponent,
    SignInPageComponent,
    SignUpPageComponent,
    ProductComponent,
    ProductDetailsComponent
  ],
  imports: [
    BrowserModule, HttpModule, FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomePageComponent },
      { path: 'signin/signup', component: SignUpPageComponent },
      { path: 'signin', component: SignInPageComponent },
      { path: 'product/:product_id', component: ProductComponent },
      { path: 'productdetails/:product_id', component: ProductDetailsComponent } // slash + : untuk parameter
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
