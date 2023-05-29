import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//agregamos esta importancion en el componets.module.ts
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';



@NgModule({
  declarations: [
    HeaderComponent
  ],
  exports:[//Exportación de componente Header
    HeaderComponent
  ],
  imports: [
    CommonModule,IonicModule/*Importamos el Ionic Module*/
  ]
})


export class ComponentsModule { }
