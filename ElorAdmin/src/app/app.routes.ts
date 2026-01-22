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
import { AddBilerak } from './component/add-bilerak/add-bilerak';

export const routes: Routes = [
    { path: '', component: Login, pathMatch: 'full' },
    { path: 'god/:id', component: HomeGod },
    { path: 'admin/:id', component: HomeAdmin },
    { path: 'ikasle/:id', component: HomeIkasle, children:[
        { path: '', component: Datuak, pathMatch: 'full' }, 
        { path: 'datuP', component: Datuak },
        {path:'ordutegia', component:Ordutegia},
        {path:'bilera', component:Bilerak,},
        {path:'addBilerak', component:AddBilerak}
    ]},
    { path: 'irakasle/:id', component: HomeIrakasle , children:[
        { path: '', component: Datuak, pathMatch: 'full' }, 
        { path: 'datuP', component: Datuak },
        {path:'ordutegia', component:Ordutegia},
        {path:'bilera', component:Bilerak},
        {path:'ikasleak', component:Ikasleak}
    ]},
    
];
