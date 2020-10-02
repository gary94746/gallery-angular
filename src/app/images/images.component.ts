import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PhotoService } from '../photo.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss'],
})
export class ImagesComponent implements OnInit {
  $photos: Observable<any>;

  constructor(private readonly photoService: PhotoService) {}

  ngOnInit() {
    this.$photos = this.photoService.getAll();
  }

  getUrl(id: string, size: string) {
    return this.photoService.imageUrl(id, size);
  }
}
