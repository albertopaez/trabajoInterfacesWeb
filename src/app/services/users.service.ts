import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConstantsService } from './constants.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  personalProfile = {}
  isLogged = false;

  constructor(private http: HttpClient, private constants: ConstantsService, ) {
    this.subscribeTogetPersonalProfile();
    if (localStorage.getItem("id")) {
      this.isLogged = true;
    }
   }

   /**
    * Este metodo se encarga de realizar la petición a la API para crear un nuevo usuario
    * @param data JSON con toda la información necesaria para crear un usuariO: correo y contraseña
    */
   signin(data){
     let aux = data;
     aux.favorites = [];
    this.http.post(`${this.constants.API_ENDPOINT}usuarios`,aux).subscribe(
      (response)=>{
        console.log("RES", response)
        this.login(data);
      },(error) => {
        console.log('error',error.error.error.message)
      });
   }

   /**
    * Este metodo se encarga de hacer la petición de login a la API 
    * y recoger tanto el token como la id del usuario de la respuesta y guardarla en el local storage.
    * Además, comprueba si el usuario es un administrador.
    * @param data JSON con toda la información para hacer login: correo y contraseña
    */
  login(data){
    this.http.post(`${this.constants.API_ENDPOINT}usuarios/login`,data).subscribe(
      (response)=>{
        localStorage.setItem('token', response["id"]);
        localStorage.setItem('id', response["userId"]);
        this.isLogged = true;
        this.checkAdmin();
      },(error) => {
        console.log('error',error.error.error.message)
        alert('Usuario o contraseña incorrectos')
      }
      ); 
  }

  /**
   * Este metodo cumple 2 funciones paralelas. Borra todo rastro de la sesión en el front
   * y elimina el token de la base de datos para que no pueda seguir utilizandose.
   * @param token String que representa la id de la sesión actual.
   */
  logout(token: string){
    let data = null;
    this.http.post(`${this.constants.API_ENDPOINT}usuarios/logout`+'?access_token='+token,data).subscribe(
      (response)=>{
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        localStorage.removeItem('isAdmin');
        this.isLogged = false;
        window.location.reload();
      },(error) => {
        //console.log('error',error.error.error.message)
      }
      ); 
  }
  

  /**
   * Este metodo accede a los datos del usuario en la base de datos.
   * Esto es necesario para poder acceder a la lista de favortios.
   * @param id String que representa la id del usuario.
   * @param token String que representa la id de la sesión actual.
   * @returns 
   */
  getPersonalProfile(id: string, token: string){
    return this.http.get(`${this.constants.API_ENDPOINT}usuarios/`+id+'?access_token='+token);
  }

  /**
   * Subscripción al metodo getPersonalProfile() para poder acceder a los datos de la petición.
   */
  subscribeTogetPersonalProfile(){
    this.getPersonalProfile(localStorage.getItem("id"), localStorage.getItem("token")).subscribe((res)=>{
      this.personalProfile = res;
    },(err)=>{
      console.log(err);
       
    })
  }

  /**
   * Este metodo realiza una petición para la que solo un administrador tiene permisos (lista de todos los usuarios)
   * para comprobar el nivel de autorización del usuario.
   */
  checkAdmin(){
    this.http.get(`${this.constants.API_ENDPOINT}usuarios/`+'?access_token='+localStorage.getItem("token")).subscribe((res)=>{
      localStorage.setItem('isAdmin', "true");
      window.location.reload();
    },(err)=>{
      console.log(err);
      localStorage.setItem('isAdmin', "false");
      window.location.reload();
    })
  }

  /**
   * Este metodo realiza una modificación sobre los favoritos del usuario en la base de datos.
   * @param data JSON con el array de favoritos actualizadas
   */
  patchFavorites(data){
    data.id = localStorage.getItem("id")
    this.http.patch(`${this.constants.API_ENDPOINT}usuarios/`+data.id+'?access_token='+localStorage.getItem("token"), data).subscribe((res)=>{
    },(err)=>{
      console.log(err);
    })
  }


}
