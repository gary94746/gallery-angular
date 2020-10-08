import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  endPoint = 'http://localhost:3000/photo/';

  constructor(private readonly httpService: HttpClient) {}

  getAll(page: number, limit: number) {
    return this.httpService.get(`${this.endPoint}?page=${page}&limit=${limit}`);
  }

  imageUrl(id: string, size: string = '250') {
    return `${this.endPoint}resize?id=${id}&size=${size}`;
  }

  getCategories() {
    return this.httpService.get(`http://localhost:3000/category`);
  }

  saveImage(image) {
    const ids = image.categories
      .filter((id) => id !== '')
      .map((category) => {
        return { id: category };
      });

    return this.httpService.post(this.endPoint, { ...image, categories: ids });
  }

  uploadImage(file: any, photoId: string) {
    const formData = new FormData();
    formData.append('image', file);

    return this.httpService.post(`${this.endPoint}${photoId}`, formData);
  }

  downloadImage(photoId: string) {
    return this.httpService.get(`${this.endPoint}download/${photoId}`, {
      responseType: 'arraybuffer',
      observe: 'response',
    });
  }
}
