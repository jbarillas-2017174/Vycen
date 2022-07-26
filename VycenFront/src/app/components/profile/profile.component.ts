import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/userRest/user.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: true
  })
  account: any

  constructor(
    private userRest: UserService
  ) { }

  ngOnInit(): void {
    this.getAccount()
  }

  getAccount() {
    this.userRest.getUser(this.userRest.getIdentity()._id).subscribe({
      next: (res: any) => this.account = res.users,
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: err.error.message,
          showConfirmButton: false,
          timer: 2000
        })
      }
    })
  }



  delete() {
    console.log('hola')
  }
  deleteAccount() {
    Swal.fire({
      title: 'Are you sure to delete your account?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your account has been deleted.',
          'success'
        )
        this.delete()
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire({
          title: 'Canceled',
          text: 'Your account is safe',
          icon: 'error',
          showConfirmButton: false,
          timer: 2000
        })
      }
    })
  }
}
