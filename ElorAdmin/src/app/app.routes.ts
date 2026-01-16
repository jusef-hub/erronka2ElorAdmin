import { Routes } from '@angular/router';
import{Login} from './component/login/login';
import { HomeGod} from './component/home-god/home-god';
import { HomeAdmin } from './component/home-admin/home-admin';
import { HomeIkasle} from './component/home-ikasle/home-ikasle';
import { HomeIrakasle } from './component/home-irakasle/home-irakasle';

export const routes: Routes = [
    { path: '', component: Login, pathMatch: 'full' },
    { path: 'god/:id', component: HomeGod },
    { path: 'admin/:id', component: HomeAdmin },
    { path: 'ikasle/:id', component: HomeIkasle },
    { path: 'irakasle/:id', component: HomeIrakasle }
];
