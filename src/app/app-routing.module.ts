import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  // asi se carga la ruta de redireccionamiento
  {
    path: 'home',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
   // asi se carga la ruta de redireccionamiento
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
  },
   // asi se carga la ruta de redireccionamiento
  {
    path: 'registro',
    redirectTo: 'registro',
    pathMatch: 'full'
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
   // asi se carga la ruta de redireccionamiento
  {
    path: 'forgot-password',
    redirectTo: 'forgot-password',
    pathMatch: 'full'
  },
  {
    path: 'profile',
    loadChildren: () => import('./users/profile/profile.module').then( m => m.ProfilePageModule)
  },
  // asi se carga la ruta de redireccionamiento
  {
    path: 'profile',
    redirectTo: 'profile',
    pathMatch: 'full',
  },
 
  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then( m => m.AboutPageModule)
  },
  {
    path: 'about',
    redirectTo: 'about',
    pathMatch: 'full'
  },
  {
    path: 'contact',
    loadChildren: () => import('./contact/contact.module').then( m => m.ContactPageModule)
  },
  {
    path: 'contact',
    redirectTo: 'contact',
    pathMatch: 'full'
  },





];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]

})
export class AppRoutingModule { }
