import { NgModule } from '@angular/core';
import { PreloadingStrategy, RouterModule, Routes } from '@angular/router';
import { CompanyComponent } from './components/company/company.component';
import { ForumComponent } from './components/forum/forum.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { UsersComponent } from './components/users/users.component';
import { ProductComponent } from './components/product/product.component';
import { SeeProductsComponent } from './components/see-products/see-products.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {path: 'product', component: ProductComponent},
  {path: 'seeProducts', component:SeeProductsComponent}
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'company', component: CompanyComponent },
  { path: 'users', component: UsersComponent },
  { path: 'forum', component: ForumComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
