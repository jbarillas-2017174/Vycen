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


  constructor(
    private forumRest: ForumRestService,
    private userRest: UserService
  ) {
    this.saveM = new ForumModel('', '', new Date());
  }

  ngOnInit(): void {
    this.getMessages();
  }

  createMessages(addMessage: any) {
    this.forumRest.createMessage(this.saveM).subscribe({
      next: (res: any) => {
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, send it!'
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
              'Add it!',
              'Your message has been sent.',
              'success'
            )
          }
        })
        this.getMessages();
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
      next: (res: any) => this.messages = res.forum,
      error: (err) => Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.error.message,
        showConfirmButton: false,
        timer: 1000
      })
    })
  }
  deleteMessages(id:string){
    this.forumRest.deleteMessage(id).subscribe({
      next: (res:any)=>{
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
  }
}
