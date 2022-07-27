import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/productRest/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: any

  constructor(
    private productRest: ProductService
  ) { }

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts() {
    this.productRest.getProducts().subscribe({
      next: (res: any) => console.log(res),
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
