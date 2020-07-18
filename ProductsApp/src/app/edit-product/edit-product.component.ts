import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductModel } from '../product-list/product.model';
import { FormGroup, FormControl, FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  id;
  submitted = false;
  productItem = new ProductModel(null,null,null,null,null,null,null,null);
  value: string = '';
  editForm = new FormGroup({
    productId: new FormControl(''),
    productName: new FormControl(''),
    productCode: new FormControl(''),
    releaseDate: new FormControl(''),
    description: new FormControl(''),
    price: new FormControl(''),
    starRating: new FormControl(''),
    imageUrl: new FormControl('')
  })

  title: string = "Edit Products"

  constructor(private productService: ProductService, private router: Router, public formbuild: FormBuilder, private _router: ActivatedRoute) { }

  ngOnInit(): void {
   
    console.log(this._router.snapshot.params.id)
    // console.log(this.editForm.value)
    this.productService.getCurrentId(this._router.snapshot.params.id)
      .subscribe((result) => {
        this.id=result['_id'];
        console.log(result);
        this.editForm = new FormGroup({
          productId: new FormControl(result['productId']),
          productName: new FormControl(result['productName']),
          productCode: new FormControl(result['productCode']),
          releaseDate: new FormControl(result['releaseDate']),
          description: new FormControl(result['description']),
          price: new FormControl(result['price']),
          starRating: new FormControl(result['starRating']),
          imageUrl: new FormControl(result['imageUrl'])
        })
      })
  }

  // EditProduct() {
  //   this.productService.editProduct(this._router.snapshot.params.id, this.editForm.value)
  //     .subscribe((result) => {
  //       console.log(result, "Data update successful")
  //     })
  // }
  EditProduct(){
    console.log(this.editForm.value);
    console.log(this.id)
    this.productService.editProduct(this.id, this.editForm.value).subscribe((data)=>{alert(data["message"]);
      this.router.navigateByUrl('/');
  },error => console.log(error));}
}
