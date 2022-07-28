import { Component, OnInit } from '@angular/core';
import { CartRestService } from 'src/app/services/cartRest/cart-rest.service';
import { CompanyRestService } from 'src/app/services/companyRest/company-rest.service';
import { ProductService } from 'src/app/services/productRest/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: any
  company: any
  searchCompany: any
  sex: any

  constructor(
    private productRest: ProductService,
    private companyRest: CompanyRestService,
    private cartRest: CartRestService
  ) {
    this.sex = [
      {
        type: 'male',

      },
      {
        type: 'female',

      },
      {
        type: 'kids',

      }
    ]

  }

  ngOnInit(): void {
    this.getProducts();
    this.getCompany();
  }

  searchC(id: String) {
    console.log(id)
    this.searchCompany = id
  }

  getCompany() {
    this.companyRest.getCompanies().subscribe({
      next: (res: any) => this.company = res.companies,
      error: (err) => {
        Swal.fire({
          title: err.error.message || err.error,
          icon: 'error',
          showConfirmButton: false,
          timer: 2000
        })
      }
    })
  }

  getProducts() {
    this.productRest.getProducts().subscribe({
      next: (res: any) => {
        this.products = res.products
      },
      error: (err) => {
        Swal.fire({
          title: err.error.message || err.error,
          icon: 'error',
          showConfirmButton: false,
          timer: 2000
        })
      }
    })
  }

  addProductCart(id: String) {
    this.cartRest.addProductCart(id).subscribe({
      next: (res: any) => {
        Swal.fire({
          title: res.message,
          icon: 'success',
          showConfirmButton: false,
          timer: 1000
        });
      },
      error: (err) => {
        Swal.fire({
          title: err.error.message || err.error,
          icon: 'error',
          showConfirmButton: false,
          timer: 2000
        })
      }
    })
  }

}
