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
  imgURL: string | ArrayBuffer;

  constructor(private readonly photoService: PhotoService) {}

  ngOnInit() {
    this.$categories = this.photoService.getCategories();
  }

  handleFileInput(files: FileList) {
    const reader = new FileReader();
    const fileName = files[0].name;
    const lastDot = fileName.lastIndexOf('.');
    const fileExtension = fileName.slice(lastDot, fileName.length);

    this.label =
      fileName.length > 30
        ? fileName.slice(0, 15) + '---' + fileExtension
        : fileName;

    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
  }
}
