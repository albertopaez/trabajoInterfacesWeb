import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { LoginFormModel } from './components/login/loginFormModel';
import { ConstantsService } from './services/constants.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'trabajoInterfacesWeb';

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
        localStorage.setItem('token', response["id"]);
        localStorage.setItem('id', response["userId"]);
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
