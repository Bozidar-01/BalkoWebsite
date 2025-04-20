import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, data: { title: 'Балко Маркети' } },   
  { path: 'about', component: AboutComponent, data: { title: 'За нас' } },
  { path: 'contact', component: ContactComponent, data: { title: 'Контактирајте Не' } }
];
