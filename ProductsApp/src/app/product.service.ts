import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl:string = 'http://localhost:3100';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http:HttpClient) { }

  getProducts(){
    return this.http.get("http://localhost:3100/products");
  }
  newProduct(item){
    console.log(item);
    return this.http.post("http://localhost:3100/insert", {"product":item})
    .subscribe(data=>{console.log(data)})
  }
  deleteProduct(id){
    return this.http.post("http://localhost:3100/delete", {"id": id})
    .subscribe((data)=>console.log(data))
    }
  getCurrentId(id: string){
    return this.http.get(`http://localhost:3100/products/${id}`);
  }

    editProduct(id, product){
        return this.http.put(`http://localhost:3100/products/${id}`,product);
      }
    
    
}

