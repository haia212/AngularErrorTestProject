import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';


const appRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  }, {
    path: 'login',
    component: LoginComponent
  }, {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

export const routing = RouterModule.forRoot(appRoutes);
