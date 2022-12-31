import { Component, OnInit } from '@angular/core';
import { CartRestService } from 'src/app/services/cartRest/cart-rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cartProducts: any
  total: number
  isLoading: boolean = true

  constructor(
    private cartRest: CartRestService
  ) {
    this.total = 0
  }

  ngOnInit(): void {
    this.getCart()
  }

  setLoading(loading: boolean) {
    if (loading == true) {
      this.isLoading = true
    } else {
      this.isLoading = false
    }
  }

  getCart() {
    this.setLoading(true)
    this.cartRest.getCart().subscribe({
      next: (res: any) => {
        this.setLoading(false)
        this.cartProducts = res.cart
        for (let t of this.cartProducts) {
          this.total += parseInt(t.subtotal)
        }
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

  payProducts() {
    this.cartRest.pay().subscribe({
      next: (res: any) => {
        this.total = 0;
        Swal.fire({
          title: `${res.thanks}\nTotal: Q.${res.total}`,
          icon: 'success',
          showConfirmButton: true,
        });
        this.getCart();
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
