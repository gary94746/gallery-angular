import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, take } from 'rxjs/operators';
import { PhotoService } from '../photo.service';
import { ToastrService } from 'ngx-toastr';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss'],
})
export class ImagesComponent implements OnInit {
  @ViewChild(ModalComponent) modal: ModalComponent;
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

  downloadImage(image) {
    this.modal.open(image);
  }
}
