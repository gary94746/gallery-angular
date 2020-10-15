import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  title: string = '';
  sizes: (string | number)[] = [150, 250, 350, 450, 'original'];
  imageId: string;

  constructor() {}

  ngOnInit() {
    const overlay = document.querySelector('.modal-overlay');
    overlay.addEventListener('click', this.toggleModal);
  }

  open(image: any) {
    this.title = image.title;
    this.imageId = image.id;
    this.toggleModal();
  }

  downloadImage(size: string | number) {
    console.log(this.imageId, size);
  }

  toggleModal() {
    const body = document.querySelector('body');
    const modal = document.querySelector('.modal');
    modal.classList.toggle('opacity-0');
    modal.classList.toggle('pointer-events-none');
    body.classList.toggle('modal-active');
  }
}
