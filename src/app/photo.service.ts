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
}
