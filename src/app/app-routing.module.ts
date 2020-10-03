import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { PhotoRegisterComponent } from './photo-register/photo-register.component';
import { ImagesComponent } from './images/images.component';

const routes: Routes = [
  {
    path: 'home',
    component: ImagesComponent,
  },
  {
    path: 'register',
    component: PhotoRegisterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
