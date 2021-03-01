import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConstantsService } from './constants.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  personalProfile = {}

  constructor(private http: HttpClient, private constants: ConstantsService, ) {
    this.subscribeTogetPersonalProfile();
   }

  login(data){
    this.http.post(`${this.constants.API_ENDPOINT}usuarios/login`,data).subscribe(
      (response)=>{
        localStorage.setItem('token', response["id"]);
        localStorage.setItem('id', response["userId"]);
        this.checkAdmin();
      },(error) => {
        console.log('error',error.error.error.message)
        alert('Usuario o contraseña incorrectos')
      }
      ); 
  }

  logout(token: string){
    let data = null;
    this.http.post(`${this.constants.API_ENDPOINT}usuarios/logout`+'?access_token='+token,data).subscribe(
      (response)=>{
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        localStorage.removeItem('isAdmin');
        window.location.reload();
      },(error) => {
        //console.log('error',error.error.error.message)
      }
      ); 
  }
  

  getPersonalProfile(id: string, token: string){
    return this.http.get(`${this.constants.API_ENDPOINT}usuarios/`+id+'?access_token='+token);
  }

  subscribeTogetPersonalProfile(){
    this.getPersonalProfile(localStorage.getItem("id"), localStorage.getItem("token")).subscribe((res)=>{
      this.personalProfile = res;
    },(err)=>{
      console.log(err);
       
    })
  }

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

  patchFavorites(data){
    this.http.patch(`${this.constants.API_ENDPOINT}usuarios/`+'?access_token='+localStorage.getItem("token"), data).subscribe((res)=>{
      console.log("WORKS", res)
    },(err)=>{
      console.log(err);
      console.log("FAILS", err)
    })
  }


}
