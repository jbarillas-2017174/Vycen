import { Component, OnInit } from '@angular/core';
import { GalleryService } from 'src/app/services/galleryRest/gallery.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  imagenes: any
  constructor(
    private galleryRest: GalleryService
  ) { }

  ngOnInit(): void {
    this.getAllImages()
  }

  getAllImages(){
    this.galleryRest.getImages().subscribe({
      next: (res: any) => {
        this.imagenes = res.imagenes
        console.log(res.imagenes)
      },
    })
  }

}
