import { Routes } from '@angular/router';
import{Login} from './component/login/login';
import { HomeIkasle} from './component/home-ikasle/home-ikasle';
import { HomeIrakasle } from './component/home-irakasle/home-irakasle';
import { Datuak } from './component/datuak/datuak';
import { Ordutegia } from './component/ordutegia/ordutegia';
import { Bilerak } from './component/bilerak/bilerak';
import { Ikasleak } from './component/ikasleak/ikasleak';
import { AddBilerak } from './component/add-bilerak/add-bilerak';
import { Lista } from './component/lista/lista'
import { Ikastetxea } from './component/ikastetxea/ikastetxea'; 

export const routes: Routes = [
    { path: '', component: Login, pathMatch: 'full' },
    { path: 'lista/:id', component: Lista },
    { path: 'ikasle/:id', component: HomeIkasle, children:[
        {path: '', component: Datuak, pathMatch: 'full' }, 
        {path: 'datuP', component: Datuak },
        {path:'ordutegia', component:Ordutegia},
        {path:'bilera', component:Bilerak,}
        
    ]},
    { path: 'irakasle/:id', component: HomeIrakasle , children:[
        {path: '', component: Datuak, pathMatch: 'full' }, 
        {path: 'datuP', component: Datuak },
        {path:'ordutegia', component:Ordutegia},
        {path:'bilera', component:Bilerak},
        {path:'addBilerak', component:AddBilerak},
        {path:'ikasleak', component:Ikasleak},
        {path:'ikastetxea/:idIkastetxe', component:Ikastetxea}
    ]},
    
];
