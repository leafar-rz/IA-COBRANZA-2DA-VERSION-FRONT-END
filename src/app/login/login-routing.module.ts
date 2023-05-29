import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComponentsModule } from '../components/components.module';
import { LoginPage } from './login.page';

const routes: Routes = [
  {
    path: '',
    component: LoginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),ComponentsModule], // importamos el modulo de componentes
  exports: [RouterModule],
})


export class LoginPageRoutingModule {}
