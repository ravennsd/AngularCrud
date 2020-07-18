import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { AddProductComponent } from './add-product/add-product.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { EditProductComponent } from './edit-product/edit-product.component';


const routes: Routes = [{path: "", component: ProductListComponent}, 
{path: "add", component: AddProductComponent}, 
{path: "edit/:id", component: EditProductComponent},
{path:"delete", component:ProductListComponent},
{path: 'signup', component: SignUpComponent},
{path: 'login', component: LoginComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
