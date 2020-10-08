import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../photo.service';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { tap } from 'rxjs/operators';

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
    photo: new FormControl('', Validators.required),
    categories: new FormArray([]),
  });

  constructor(private readonly photoService: PhotoService) {}

  ngOnInit() {
    this.$categories = this.photoService.getCategories().pipe(
      tap((categories: any[]) => {
        categories.forEach(() => this.categories.push(new FormControl('')));
      })
    );
  }

  get categories() {
    return this.form.get('categories') as FormArray;
  }

  handleFileInput(files: FileList) {
    const reader = new FileReader();
    const fileName = files[0].name;
    const lastDot = fileName.lastIndexOf('.');
    const fileExtension = fileName.slice(lastDot + 1, fileName.length);

    if (!this.isImage(fileExtension)) {
      alert('Only images are allowed');
      return;
    }

    // change label, if filename is too long
    this.label =
      fileName.length > 30
        ? fileName.slice(0, 15) + '---.' + fileExtension
        : fileName;

    // read as url and setup the selected image
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
  }

  isImage(fileExtension: string) {
    return (
      fileExtension === 'png' ||
      fileExtension === 'gif' ||
      fileExtension === 'jpeg' ||
      fileExtension === 'jpg'
    );
  }

  clear() {
    this.form.reset();
    this.imgURL = '';
    this.label = '';
  }

  onSubmit() {
    console.log(this.form.value);
  }
}
