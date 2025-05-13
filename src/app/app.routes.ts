import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { MarketsComponent } from './markets/markets.component';
import { WorkComponent } from './work/work.component';
import { PromotionsComponent } from './promotions/promotions.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      title: 'Балко Маркети - Почетна',
      description: 'Добредојдовте во Балко Маркети – водечки синџир маркети низ Македонија со свежа храна и локални производи.'
    }
  },
  {
    path: 'zanas',
    component: AboutComponent,
    data: {
      title: 'За Нас - Балко Маркети',
      description: 'Дознајте повеќе за историјата, мисијата и вредностите на Балко Маркети – вашиот доверлив партнер за секојдневна набавка.'
    }
  },
  {
    path: 'kontakt',
    component: ContactComponent,
    data: {
      title: 'Контакт - Балко Маркети',
      description: 'Контактирајте не за прашања, предлози или соработка. Балко Маркети секогаш достапни за своите потрошувачи.'
    }
  },
  {
    path: 'marketi',
    component: MarketsComponent,
    data: {
      title: 'Нашите Маркети - Балко Маркети',
      description: 'Прегледајте ги сите локации на Балко Маркети низ Македонија и најдете го најблискиот маркет до вас.'
    }
  },
  {
    path: 'vrabotuvanje',
    component: WorkComponent,
    data: {
      title: 'Вработување - Балко Маркети',
      description: 'Придружете се на нашиот тим! Разгледајте ги отворените работни позиции во Балко Маркети и аплицирајте денес.'
    }
  }, 
   {
    path: 'promocii',
    component: PromotionsComponent,
    data: {
      title: 'Промоции - Балко Маркети',
      description: 'Разгледајте ги нашите промоции.'
    }
  }
];
