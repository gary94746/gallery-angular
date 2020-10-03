import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, take } from 'rxjs/operators';
import { PhotoService } from '../photo.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss'],
})
export class ImagesComponent implements OnInit {
  images = new BehaviorSubject([]);
  finish: boolean;
  page = 0;

  constructor(private readonly photoService: PhotoService) {}

  ngOnInit() {
    this.getImages();
  }

  getUrl(id: string, size: string) {
    return this.photoService.imageUrl(id, size);
  }

  onScroll() {
    if (this.finish) return;
    this.getImages();
  }

  getImages() {
    this.photoService
      .getAll(++this.page, 10)
      .pipe(
        tap((images: any) => {
          const ppreviousImages = this.images.getValue();
          this.images.next([...ppreviousImages, ...images.data]);

          if (this.images.getValue().length === images.totalCount) {
            this.finish = true;
          }
        }),
        take(1)
      )
      .subscribe();
  }
}
