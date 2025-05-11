import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { MarketsComponent } from './markets/markets.component';
import { WorkComponent } from './work/work.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, data: { title: 'Балко Маркети' } },
  { path: 'zanas', component: AboutComponent, data: { title: 'За нас' } },
  { path: 'kontakt', component: ContactComponent, data: { title: 'Контактирајте Не' } },
  { path: 'marketi', component: MarketsComponent, data: { title: 'Маркети' } },
  { path: 'vrabotuvanje', component: WorkComponent, data: { title: 'Вработување' } }
];
