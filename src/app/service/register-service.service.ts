import { Injectable } from '@angular/core';
// importamos esta libreria para usar client http
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

//creamos una interfaz para poder obtener los valores del response al recuperar la contraseña en el forgot-password
interface UpdatePasswordResponse {
  message: string;
  new_password: string;
  user: any;
}

@Injectable({
  providedIn: 'root'
})
export class RegisterServiceService {
  // agregamos esto para conectar
  baseurl = 'https://iacobranza.shop';
  //baseurl = 'http://127.0.0.1:8000';
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  // importamos el http cliente, el constuctor es lo primeo que se ejecuta al arrancar
  constructor(private http: HttpClient) { }

  // metod de registro, requiere los parametros

resgister(name: string, email: string, password: string): Observable<any>
{
   // vamos a retornar el http porque es un post
  return this.http.post(
    `${this.baseurl}/api/register`,
    { name, email, password},
    { headers: this.httpHeaders }
  );
}

//creamos el metodo de log in
login(email: string, password: string): Observable<any>
{
   // vamos a retornar el http porque es un post
  return this.http.post(
    `${this.baseurl}/api/login`,
    {email, password},
    { headers: this.httpHeaders }
  );
  //http://127.0.0.1:8000/api/login
}




  //metodo del usuario corriendo ahora, headers es el id y el token
  getCurrentUser(id:any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    });

    return this.http.get(`${this.baseurl}/api/users/show/`+id, { headers });
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('access_token');
    return !!token;
  }
    
 

    actualizarRandomPassword(email: string): Observable<any>
    {
      // vamos a retornar el http porque es un put
      return this.http.put(
        //ponemos la ip base y le sumamos la ip del servicio de laravel y le sumamos el email de parametro del metodo para que le actualice a el la contraseña
        `${this.baseurl}/api/updateRandom/${email}`,{});
        // //http://127.0.0.1:8000/api/updateRandom/1@gmail.com
    }

    logout(): Observable<any>
    {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      });
  
      return this.http.delete(
        `${this.baseurl}/api/logout`,
        { headers }
      );
    }


    /*El método logout() utiliza la clase HttpHeaders para definir las cabeceras de la solicitud HTTP. La cabecera Content-Type se establece en application/json, lo que indica que se espera que los datos de la solicitud y la respuesta estén en formato JSON. La cabecera Authorization se establece en un valor que contiene un token de acceso (access_token) almacenado en el almacenamiento local del navegador (localStorage).

    Luego, la función utiliza el servicio HttpClient de ionic para realizar la solicitud HTTP DELETE al servidor. La URL a la que se envía la solicitud es ${this.baseurl}/api/logout/, donde baseurl es la URL base del servidor. El objeto headers se pasa como un segundo parámetro a la función delete(), lo que agrega las cabeceras de la solicitud.

    Finalmente, la función devuelve el resultado de la solicitud HTTP como un Observable. Un Observable es un patrón de programación que permite trabajar con secuencias de eventos asincrónicos, como las respuestas HTTP del servidor. La función que llama a logout() puede suscribirse al Observable devuelto para recibir la respuesta del servidor cuando se completa la solicitud.
*/

/*
     actualizarPassword(id: string, password: string): Observable<any>
    {
      // vamos a retornar el http porque es un put
      return this.http.put(
        //ponemos la ip base y le sumamos la ip del servicio de laravel y le sumamos el email de parametro del metodo para que le actualice a el la contraseña
        `${this.baseurl}/api/updateManualPassword/${id}/${password}`,{});
    }

   */
   
}



