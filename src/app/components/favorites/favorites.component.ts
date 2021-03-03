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
  personalFavs = [];
  existsFavorites = false;

  constructor(private usersService: UsersService, private moviesService: MoviesService ) {
    this.getPersonalFavs();
    this.getFavoriteMovies();
   }

  ngOnInit(): void {
  }

  getPersonalFavs() {
    this.usersService.getPersonalProfile(localStorage.getItem("id"), localStorage.getItem("token")).subscribe((res) => {
      this.personalFavs = res["favorites"];
      //this.getMovies()
    }, (err) => {
      console.log("err", err)
    })
  }

  deleteFromFavs(fav: string) {
    let position = null;
    let cont = 0;
    this.personalFavs.forEach(pos => {
      if (pos == fav) {
        position = cont
      }
      cont++
    });
    if (position != null) {
      this.personalFavs.splice(position, 1);
      let data = {
        "favorites": this.personalFavs
      }
      document.getElementById(fav).remove();
      this.usersService.patchFavorites(data);
    }
  }

  getFavoriteMovies(){
    this.usersService.getPersonalProfile(localStorage.getItem("id"), localStorage.getItem("token")).subscribe((res)=>{
      let aux = res["favorites"];
    if (aux && aux[0] != "") aux.forEach(id => {
      this.moviesService.getMovieFromId(id).subscribe(
        (res2)=>{
          this.myMovies.push(res2);
          if(this.myMovies.length != 0){
            this.existsFavorites = true;
          }
        },(error) => {
          console.log('error',error.error.error.message)
        }
        ); 
    });
    },(err)=>{
      console.log(err);
      alert('Ha ocurrido un error al obtener el post: \n'+err.err)
    })
  }

}