import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartRestService } from 'src/app/services/cartRest/cart-rest.service';
import { ProductService } from 'src/app/services/productRest/product.service';
import { UserService } from 'src/app/services/userRest/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-see-products',
  templateUrl: './see-products.component.html',
  styleUrls: ['./see-products.component.css']
})
export class SeeProductsComponent implements OnInit {
  idProduct: any
  productInfo: any
  identity: any

  constructor(
    public activatedRoute: ActivatedRoute,
    private productRest: ProductService,
    private userRest: UserService,
    private cartRest: CartRestService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((id: any) => {
      this.idProduct = id.get('id');
    })
    this.getProduct(this.idProduct)
    this.identity = this.userRest.getIdentity().role;
  }

  getProduct(id: String) {
    this.productRest.getProduct(id).subscribe({
      next: (res: any) => {
        this.productInfo = res.product
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

  addProduct(id: String) {
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

  quitProduct(id: String) {
    this.cartRest.quitProductCart(id).subscribe({
      next: (res: any) => {
        Swal.fire({
          title: res.message,
          icon: 'success',
          showConfirmButton: false,
          timer: 2000
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
