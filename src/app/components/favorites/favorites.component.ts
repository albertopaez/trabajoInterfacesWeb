import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  myMovies = [];

  constructor(private usersService: UsersService, private moviesService: MoviesService ) {
    this.getFavoriteMovies();
   }

  ngOnInit(): void {
  }

  getFavoriteMovies(){
    this.usersService.getPersonalProfile(localStorage.getItem("id"), localStorage.getItem("token")).subscribe((res)=>{
      let aux = res["favorites"];
    if (aux && aux[0] != "") aux.forEach(id => {
      this.moviesService.getMovieFromId(id).subscribe(
        (res2)=>{
          this.myMovies.push(res2);
        },(error) => {
          console.log('error',error.error.error.message)
          alert('Usuario o contraseña incorrectos')
        }
        ); 
    });
    },(err)=>{
      console.log(err);
      alert('Ha ocurrido un error al obtener el post: \n'+err.err)
    })
  }

}