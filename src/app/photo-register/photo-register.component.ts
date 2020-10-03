import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../photo.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-photo-register',
  templateUrl: './photo-register.component.html',
  styleUrls: ['./photo-register.component.scss'],
})
export class PhotoRegisterComponent implements OnInit {
  $categories: Observable<any>;
  label: string = '';

  constructor(private readonly photoService: PhotoService) {}

  ngOnInit() {
    this.$categories = this.photoService.getCategories();
  }

  handleFileInput(file: any) {
    this.label = file[0].name;
  }
}
