import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginFormModel } from './components/login/loginFormModel';
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

  search(){
    let aux = (<HTMLInputElement>document.getElementById('tagSearch')).value
    if ( aux != null && aux != '') {
      this.redirect(aux);
    }
  }

  redirect(tag: string){
    let dir = 'http://localhost:4200/categories/'+tag;
    window.location.href = dir;
  }

  onSubmitLogin() { 
    console.log("LOGIN MODEL", this.loginModel)
    this.usersService.login(this.loginModel);
   }

   onSubmitSignin() { 
    this.usersService.signin(this.loginModel);
   }

   onLogout(){
     console.log("LOGOUT FUNCIONA")
    this.usersService.logout(localStorage.getItem('token'));
   }

  ngOnInit(): void {
  }


}
