import { Component, OnInit } from '@angular/core';
import { ForumRestService } from 'src/app/services/forumRest/forum-rest.service';
import { ForumModel } from 'src/app/model/forum.model';
import { UserService } from 'src/app/services/userRest/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {
  saveM: ForumModel;
  messages: any;
  identity: any



  constructor(
    private forumRest: ForumRestService,
    private userRest: UserService

  ) {
    this.saveM = new ForumModel('', '', new Date());
  }

  ngOnInit(): void {
    this.getMessages();
    this.identity = this.userRest.getIdentity()._id;
  }

  createMessages(addMessageForm: any) {
    this.forumRest.createMessage(this.saveM).subscribe({
      next: (res: any) => {
        this.getMessages();
        addMessageForm.reset();
      },
      error: (err) => Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.error.message,
        showConfirmButton: false,
        timer: 1000
      })
    }
    )
  }

  getMessages() {
    this.forumRest.getMessages().subscribe({
      next: (res: any) => {
        this.messages = res.forum
        console.log(this.messages)
      },
      error: (err) => Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.error.message,
        showConfirmButton: false,
        timer: 1000
      })
    })
  }


  deleteMessages(id: string) {
    Swal.fire({
      title: 'Delete message to everyone?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete it',
      cancelButtonText: 'Cancel',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.forumRest.deleteMessage(id).subscribe({
          next: (res: any) => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: res.message,
              showConfirmButton: false,
              timer: 1000
            })
            this.getMessages();
          },
          error: (err) => Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.error.message,
            showConfirmButton: false,
            timer: 1000
          }),
        });


      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire({
          title: 'Canceled',
          icon: 'error',
          showConfirmButton: false,
          timer: 2000
        })
      }
    })
  }
}
