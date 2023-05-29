import { Component, OnInit } from '@angular/core';
//importacion de los formgroup
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
//importamos el router
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { Subscriber } from 'rxjs';
// service de registro
import { RegisterServiceService } from '../service/register-service.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit 
{
// se agrego el FormGroup
formReg: FormGroup;
myCheckboxControl = new FormControl(false);

constructor
(
  //objeto de la autenticacion
  private registerService: RegisterServiceService,
  //objeto del router
  private router: Router,
  //importacion del form builder
  private formBuilder: FormBuilder,
  //Objeto para usar alertas con el AlertController
  private alertController: AlertController,
  private navCtrl: NavController
) 
//validacion del metodo para que si se registre
{
this.formReg = this.formBuilder.group({
  name: ['', Validators.required],
  email: ['', [Validators.required, Validators.email]],
  password: ['', [Validators.required, Validators.minLength(6)]],
});
}

ionViewWillEnter() {
  this.formReg.reset();
}
  
  isFormValid(): boolean {
    if(this.formReg.valid && this.myCheckboxControl.value) {
      return true;
    } else {
      return false;
    }
  }

  ngOnInit() 
  {
  }

  goBack() {
    this.navCtrl.pop();
  }

// se agrego el metodo de register

register()
{
  if(this.formReg.valid)
  {
    //asignacion de las variables a los valores del formulario
    const {name, email, password}=this.formReg.value;
    //llamamos al metodo de registro de la pagina se servicios en la de registro (asigancion de las 3 variables a las consantes que tenemos arriba)
    // suscribe: lo que espera de respuesta de lo que consume el servicio
    // response es lo que se espera del metodo, es como lo que regresa una consulta en mysql( es lo que nos da de respuesta)
    // En el response es donde se consume el servicio
    this.registerService.resgister(name, email, password).subscribe(async (response: any)  => 
    {
      console.log("Respone: ",response);
      if(response.data=='User already exists!')
      {
        const alert = await this.alertController.create({
          header: 'Registro fallido',
          message: `User already exists!`,
          buttons: ['OK']
        });
        //Ejecutamos la alerta
        await alert.present();
        this.router.navigate(['/registro']);
      }
      else
      {
        const alert = await this.alertController.create({
          header: 'Registro exitoso',
          message: `Bienvenido: `+name,
          buttons: ['OK']
        });
        //Ejecutamos la alerta
        await alert.present();
        

        this.registerService.login(this.formReg.get('email')?.value, this.formReg.get('password')?.value).subscribe(
          async (response: any)  => {
            localStorage.setItem('access_token',response.token)
            localStorage.setItem('id_user',response.data.id)
            this.router.navigate(['/home']);
          }
        );

      }
     
    },
    //Creamos esta alerta que indica que el login no fue exitoso y mostramos el error en un mensaje
    async (error) => {
      const alert = await this.alertController.create({
        header: 'Error',
        message: error.error.message,
        buttons: ['OK']
      });
      //Ejecutamos la alerta
      await alert.present();
      //redireccionamos al login para que borre los datos incorrectos del formulario
      this.router.navigate(['/registro']);
    }
    
    )
  }
}

onSubmit(){
}


}
