import { Component } from '@angular/core';
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

  constructor( private usersService: UsersService ) {
    if(localStorage.getItem("token")){
      this.isLogged = true;
    }
    if(localStorage.getItem("isAdmin") == "true"){
      this.isAdmin = true;
    }
  }

  model = new LoginFormModel('', '');

  onSubmit() { 
    console.log(this.model);
    this.usersService.login(this.model);
   }

   onLogout(){
     console.log("LOGOUT FUNCIONA")
    this.usersService.logout(localStorage.getItem('token'));
   }

  ngOnInit(): void {
  }


}
