import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../photo.service';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { tap, race, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-photo-register',
  templateUrl: './photo-register.component.html',
  styleUrls: ['./photo-register.component.scss'],
})
export class PhotoRegisterComponent implements OnInit {
  $categories: Observable<any>;
  label: string = '';
  imgURL: string | ArrayBuffer;
  form: FormGroup;
  file: File;

  isUploading = false;

  constructor(
    private readonly photoService: PhotoService,
    private readonly router: Router,
    private readonly toastr: ToastrService
  ) {
    this.form = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
      alt_description: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
      photo: new FormControl('', Validators.required),
      categories: new FormArray([]),
    });
  }

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
    this.file = files[0];
    const reader = new FileReader();
    const fileName = files[0].name;
    const lastDot = fileName.lastIndexOf('.');
    const fileExtension = fileName.slice(lastDot + 1, fileName.length);

    if (!this.lessorEqualThanXMB(this.file.size, 1)) {
      this.toastr.info(
        'Image size must be less or equal than ' + 1 + 'mb',
        'File size'
      );

      return;
    }

    if (!this.isImage(fileExtension)) {
      this.toastr.info('Please select an image file', 'File type');
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

  lessorEqualThanXMB(size: number, mb: number) {
    return size / 1024 / 1024 <= mb;
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
    this.toastr.info('Fields are clear', 'Clear');
  }

  onSubmit() {
    this.isUploading = true;

    this.photoService.saveImage(this.form.value).subscribe(
      (photo: any) => {
        this.photoService.uploadImage(this.file, photo.id).subscribe(
          () => {
            this.toastr.success('Succesfully upload', 'Upload');
            this.isUploading = false;
            this.router.navigate(['/']);
          },
          () => {
            this.toastr.warning('Image was not upload', 'Error');
          }
        );
      },
      () => {
        this.toastr.warning('Image was not upload', 'Error');
      }
    );
  }
}
