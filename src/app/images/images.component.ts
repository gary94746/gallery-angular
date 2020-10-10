import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, take } from 'rxjs/operators';
import { PhotoService } from '../photo.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss'],
})
export class ImagesComponent implements OnInit {
  images = new BehaviorSubject([]);
  finish: boolean;
  page = 0;

  constructor(
    private readonly photoService: PhotoService,
    private readonly toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getImages();
  }

  getUrl(id: string, size: string) {
    return this.photoService.imageUrl(id, size);
  }

  displayError(event: any) {
    event.target.src = 'assets/error.jpg';
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

  downloadImage(id) {
    this.photoService.downloadImage(id).subscribe(
      (e) => this.downloadFile(e.body, e.headers.get('Content-Type'), name),
      () => {
        this.toastr.error('This file has troubles', 'Error');
      }
    );
  }

  downloadFile(data: any, type: string, name: string) {
    if (type == 'image') type = type.concat('/jpeg');
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.setAttribute('style', 'display: none');
    let blob = new Blob([data], { type });
    let url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = name;
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }
}
