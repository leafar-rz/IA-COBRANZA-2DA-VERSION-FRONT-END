import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { RegisterServiceService } from '../service/register-service.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {

  mensaje:any;
  
  constructor( 
    //Objeto para poder usar todos los elementos del RegisterServiceService
  private registerService: RegisterServiceService,
  //Objeto para poder navegar dentro de la app
  private router: Router,
  //Objeto para poder usar las respuesta http del usuario en los metodos de laravel
  private http: HttpClient,
  //Objeto para poder usar alertas
  private alertController: AlertController,
  //@Inject(EmailComposer) private emailComposer: EmailComposer
  private emailComposer: EmailComposer,
  private navCtrl: NavController) { }

  

  ngOnInit() {
  }

  goBack() {
    this.navCtrl.pop();
  }

 async enviarMensaje()
  {
    const emailUrl = "mailto:" + "ruizleafar1hm@gmail.com" + "?subject=Comentario nuevo en la app de cobranza&body=" + this.mensaje;
            
            window.open(emailUrl, '_system');

    let email = {
    to:  "ruizleafar1hm@gmail.com",
    subject: 'Comentario nuevo en la app de cobranza',
    body: this.mensaje
     };
           
    // Enviar el correo electrónico
    this.emailComposer.open(email);
    console.log('Mensaje enviado ');

    
    const alert = await this.alertController.create({
        header: 'Información',
        message: `Mensaje enviado con exito`,
        buttons: ['OK']
            });
            await alert.present();  
        
  this.mensaje=null;
  }

  

}
