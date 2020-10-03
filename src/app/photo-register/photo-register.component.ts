import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../photo.service';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-photo-register',
  templateUrl: './photo-register.component.html',
  styleUrls: ['./photo-register.component.scss'],
})
export class PhotoRegisterComponent implements OnInit {
  $categories: Observable<any>;
  label: string = '';
  imgURL: string | ArrayBuffer;
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    altName: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });

  constructor(private readonly photoService: PhotoService) {}

  ngOnInit() {
    this.$categories = this.photoService.getCategories();
    console.log(this.form.controls.name.setErrors(null));
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

  clear() {
    this.form.reset();
  }

  onSubmit() {
    alert('Submit');
  }
}
