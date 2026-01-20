import { Routes } from '@angular/router';
import{Login} from './component/login/login';
import { HomeGod} from './component/home-god/home-god';
import { HomeAdmin } from './component/home-admin/home-admin';
import { HomeIkasle} from './component/home-ikasle/home-ikasle';
import { HomeIrakasle } from './component/home-irakasle/home-irakasle';
import { Datuak } from './component/datuak/datuak';
import { Ordutegia } from './component/ordutegia/ordutegia';
import { Bilerak } from './component/bilerak/bilerak';
import { Ikasleak } from './component/ikasleak/ikasleak';

export const routes: Routes = [
    { path: '', component: Login, pathMatch: 'full' },
    { path: 'god/:id', component: HomeGod },
    { path: 'admin/:id', component: HomeAdmin },
    { path: 'ikasle/:id', component: HomeIkasle, children:[
        { path: '', component: Datuak, pathMatch: 'full' }, 
        { path: 'datuP/:id', component: Datuak },
        {path:'ordutegia/:id', component:Ordutegia},
        {path:'bilera/:id', component:Bilerak}
    ]},
    { path: 'irakasle/:id', component: HomeIrakasle , children:[
        { path: '', component: Datuak, pathMatch: 'full' }, 
        { path: 'datuP/:id', component: Datuak },
        {path:'ordutegia/:id', component:Ordutegia},
        {path:'bilera/:id', component:Bilerak},
        {path:'ikasleak/:id', component:Ikasleak}
    ]},
    
];
