import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { ProductModel } from '../product-list/product.model';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  submitted = false; 

  title: string="Add Products"

  constructor(private productService: ProductService, private router:Router, public formbuild: FormBuilder) { }

  productItem = new ProductModel(null,null,null,null,null,null,null,null);

  ngOnInit(): void {
  }
  
  AddProduct(){
    this.productService.newProduct(this.productItem)
    console.log("called");
    alert("success");
    this.router.navigate(["/"]);
  }

}
