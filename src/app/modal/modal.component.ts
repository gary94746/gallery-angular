import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../photo.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  title: string = '';
  sizes: (string | number)[] = [150, 250, 350, 450, 'original'];
  imageId: string;

  constructor(private service: PhotoService, private toastr: ToastrService) {}

  ngOnInit() {
    const overlay = document.querySelector('.modal-overlay');
    overlay.addEventListener('click', this.toggleModal);
  }

  open(image: any) {
    this.title = image.title;
    this.imageId = image.id;
    this.toggleModal();
  }

  downloadImage(size: string) {
    this.service.downloadImage(this.imageId, size).subscribe(
      (e) => {
        this.downloadFile(e.body, 'image', this.imageId);
      },
      () => this.toastr.warning("Image can't be download", 'Error')
    );
  }

  toggleModal() {
    const body = document.querySelector('body');
    const modal = document.querySelector('.modal');
    modal.classList.toggle('opacity-0');
    modal.classList.toggle('pointer-events-none');
    body.classList.toggle('modal-active');
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
