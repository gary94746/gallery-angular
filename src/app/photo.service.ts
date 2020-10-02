import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  constructor(private readonly httpService: HttpClient) {}

  getAll() {
    return this.httpService.get('http://localhost:3000/photo/?page=1&limit=1');
  }
}
