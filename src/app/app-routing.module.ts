import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { PhotoRegisterComponent } from './photo-register/photo-register.component';
import { ImagesComponent } from './images/images.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: ImagesComponent,
  },
  {
    path: 'home',
    component: ImagesComponent,
  },
  {
    path: 'register',
    component: PhotoRegisterComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
