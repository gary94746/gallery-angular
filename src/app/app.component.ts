import { Component, OnInit } from '@angular/core';
import { PhotoService } from './photo.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'gallery-fronted';
  obs: Observable<any>;

  constructor(private readonly photoS: PhotoService) {}

  ngOnInit(): void {
    this.obs = this.photoS.getAll();
  }

  getAll() {}

  getImageUrl(id: string, size: number) {
    return `http://localhost:3000/photo/resize/?id=${id}&size=${size}`;
  }
}
