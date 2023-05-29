import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { RegisterServiceService } from 'src/app/service/register-service.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: any;
  id_user: any;
  password:any;

  mostrarFormulario=false;

  constructor(private router: Router, private registerService: RegisterServiceService,
    private alertController: AlertController) { }
  

  ionViewWillEnter() {
    this.id_user = localStorage.getItem('id_user')
    if (this.registerService.isLoggedIn()) 
    {
      this.registerService.getCurrentUser(this.id_user).subscribe(
        (response) => {
          this.user = response.data;
          console.log('El usuario logeado es>',this.user)
        },
        (error) => {
          console.log(error);
        }
      );
    } 
    else 
    {
      this.router.navigate(['/login']);
    }
  }
  
  ngOnInit() {
   
  }


  onLogout() {
    this.registerService.logout().subscribe(
      response => {
        console.log(response);
       this.user=null;
        this.router.navigate(['/login']);
        // Aquí puedes redirigir al usuario a la página de inicio de sesión o hacer cualquier otra acción necesaria.
      },
      error => {
        console.log(error);
        this.router.navigate(['/profile']);
      }
    );
  }
    /*

  changePassword()
  {
    this.mostrarFormulario=true;
  }

  cancel()
  {
    this.mostrarFormulario=false;
    this.password=null;
  }


  changePasswordMethod()
  {
    this.registerService.actualizarPassword(this.id_user,this.password).subscribe(
      async(response) => {
        console.log(response.message);   
        this.mostrarFormulario=false;
        this.password=null;
        const alert = await this.alertController.create({
          header: 'Informacion',
          message: response.message,
          buttons: ['OK']
        });
        await alert.present(); 
      },
      async(error) => {
        console.log(error);
        const alert = await this.alertController.create({
          header: 'Error',
          message: error.error.message,
          buttons: ['OK']
        });
        await alert.present(); 
        this.mostrarFormulario=false;
        this.password=null;
      }
    );
  }*/

}
