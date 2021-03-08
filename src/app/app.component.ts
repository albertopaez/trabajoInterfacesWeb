import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginFormModel } from './components/models/loginFormModel';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'trabajoInterfacesWeb';

  isLogged = false;
  isAdmin = false;
  loginModel = new LoginFormModel('', '');

  constructor(private router: Router, private usersService: UsersService ) {
    if(localStorage.getItem("token")){
      this.isLogged = true;
    }
    if(localStorage.getItem("isAdmin") == "true"){
      this.isAdmin = true;
    }
  }

  /**
   * Este metodo recoge el valor del buscador y comprueba que no es nulo para llevar a cabo la busqueda.
   */
  search(){
    let aux = (<HTMLInputElement>document.getElementById('tagSearch')).value
    if ( aux != null && aux != '') {
      this.redirect(aux);
    }
  }

  /**
   * Este metodo redirige al componente donde se mostraran los resultados de la busqueda.
   * @param tag Termino de la busqueda
   */
  redirect(tag: string){
    let dir = 'http://localhost:4200/categories/'+tag;
    window.location.href = dir;
  }

  /**
   * Este metodo recoge los datos del modelo login y los envia para hacer una petición de logueo.
   */
  onSubmitLogin() { 
    console.log("LOGIN MODEL", this.loginModel)
    this.usersService.login(this.loginModel);
   }

   /**
   * Este metodo recoge los datos del modelo login y los envia para hacer una petición de registro.
   */
   onSubmitSignin() { 
    this.usersService.signin(this.loginModel);
   }

   /**
   * Este metodo realiza una petición de log out.
   */
   onLogout(){
     console.log("LOGOUT FUNCIONA")
    this.usersService.logout(localStorage.getItem('token'));
   }

  ngOnInit(): void {
  }


}
