import { Component, OnInit } from '@angular/core';
//importacion de los formgroup
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
//importamos el router
import { Router } from '@angular/router';
import { Subscriber } from 'rxjs';
// service de registro
import { RegisterServiceService } from '../service/register-service.service';
//importamos las alertas
import { AlertController } from '@ionic/angular';

@Component
  ({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
  })


export class LoginPage implements OnInit 
{
  // se agrego el FormGroup
  id : any;
  LoginForm: FormGroup;
  //Declaramos estas dos variables para saber que usuario esta actualmente corriendo
  user: any;
  id_user: any;

  constructor
  (
    //objeto de la autenticacion
    private registerService: RegisterServiceService,
    //objeto del router
    private router: Router,
    //importacion del form builder
    private formBuilder: FormBuilder,
    //Objeto para usar alertas con el AlertController
    private alertController: AlertController
  ) 
  //validacion del metodo para que si se logie
  {
    this.LoginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.LoginForm.reset();
  }

  login(){
   
   
        //metodo del login, pasandole como parametros los valores del formulario
    this.registerService.login(this.LoginForm.get('email')?.value, this.LoginForm.get('password')?.value).subscribe(
      async (response: any)  => {
        console.log(response);
        // con el localstorage se almacena el token que tiene el usuario
        // token es el identificador con el que podemos optener los datos dentro de la pagina
        localStorage.setItem('access_token',response.token)
        localStorage.setItem('id_user',response.data.id)
        //mandamos a la consola el mensaje de que se inicio sesion correctamente
        console.log('Se inicio sesión correctamente');
       // this.id=response.data.id;
        //Creamos esta alerta que indica que el login fue exitoso y le decimos al usuario que es bienvenido y le ponemos su nombre en el mensaje
        const alert = await this.alertController.create({
          header: 'LogIn exitoso',
          message: `Bienvenido: ${response.data.name} `,
          buttons: ['OK']
        });
        //Ejecutamos la alerta
        await alert.present();
        //redireccionamos al home una vez hecho el log in correctamente
        this.router.navigate(['/home']);
        
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
        this.router.navigate(['/login']);
      }
    );
  }


}


