
import {Routes,RouterModule } from '@angular/router'; 
import {InfoPredstavnik } from './infopredstavnik/infopredstavnik' ;
import {InfoMajstor } from './infomajstor/infomajstor' ;
import {InfoStan } from './infostan/infostan' ;
import {HomePage } from './myhome/homepage' ;
import {LoginComponent } from './mylogin/loginpage' ;

const appRoutes :Routes = [
         { path: 'infopredstavnik',     component : InfoPredstavnik },
         { path: 'infomajstor',     component : InfoMajstor },
         { path: 'infostan',     component : InfoStan },
         { path: 'home',     component : HomePage },
         { path: 'login',     component : LoginComponent },
         { path: '', pathMatch : 'full',redirectTo:'/login' }


];
export const routing = RouterModule.forRoot(appRoutes) ;