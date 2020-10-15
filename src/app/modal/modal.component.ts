import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  title: string = '';

  constructor() {}

  ngOnInit() {
    const overlay = document.querySelector('.modal-overlay');
    overlay.addEventListener('click', this.toggleModal);
  }

  open(data: { title: string }) {
    this.title = data.title;
    this.toggleModal();
  }

  toggleModal() {
    const body = document.querySelector('body');
    const modal = document.querySelector('.modal');
    modal.classList.toggle('opacity-0');
    modal.classList.toggle('pointer-events-none');
    body.classList.toggle('modal-active');
  }
}
