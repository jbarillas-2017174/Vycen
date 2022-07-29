import { Component, OnInit } from '@angular/core';
import { ForumRestService } from 'src/app/services/forumRest/forum-rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {
  forum: any
  basePath: any

  constructor(
    private forumRest: ForumRestService
  ) {
    this.basePath = '../../../../../server/'
  }

  ngOnInit(): void {
    this.getForum()
  }

  getForum() {
    this.forumRest.getImages().subscribe({
      next: (res: any) => {
        console.log(res)
      },
      error: (err) => {
        Swal.fire({
          title: err.error.message || err.error,
          icon: 'success',
          showConfirmButton: false,
          timer: 2000
        })
      }
    })
  }

}
