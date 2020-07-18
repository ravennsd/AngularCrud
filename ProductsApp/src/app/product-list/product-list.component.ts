import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ProductModel } from './product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  title: String="Products List"
  products: ProductModel[];
  imageWidth:number= 50
  imageMargin: number =20

  constructor(private productService: ProductService, private router:Router) { }

  ngOnInit(): void {
    this.productService.getProducts()
    .subscribe((data)=>
    this.products= JSON.parse(JSON.stringify(data)));
  }
  
  DeleteProduct(id){
    this.productService.deleteProduct(id);
  
      console.log("deleted");
      alert("Item Deleted")

   location.reload(); 
 }

}
