import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  constructor(private readonly httpService: HttpClient) {}

  getAll(page: number, limit: number) {
    return this.httpService.get(
      `http://localhost:3000/photo/?page=${page}&limit=${limit}`
    );
  }

  imageUrl(id: string, size: string = '250') {
    return `http://localhost:3000/photo/resize?id=${id}&size=${size}`;
  }
}
