import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConstantsService } from 'src/app/services/constants.service';
import { LoginFormModel } from './loginFormModel';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( private http: HttpClient, private constants: ConstantsService ) {  
  }

  model = new LoginFormModel('', '');


  onSubmit() { 
    console.log(this.model);
    this.loginUser(this.model);
   }

  ngOnInit(): void {
  }

  loginUser(data){
    this.http.post(`${this.constants.API_ENDPOINT}usuarios/login`,data).subscribe(
      (response)=>{
        localStorage.setItem('token',JSON.stringify(response));
        localStorage.setItem('pass',JSON.stringify(data.password));
        console.log('Correct login');
        window.location.reload();
        //JSON.parse() para convertir el string almacenado en un JSON.
      },(error) => {
        console.log('error',error.error.error.message)
        alert('Usuario o contraseña incorrectos')
      }
      ); 
  }


}
