import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MoviesService } from 'src/app/services/movies.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  movies = this.moviesServices.getMovies();
  personalFavs = [];

  constructor(private http: HttpClient, private moviesServices: MoviesService, private usersService: UsersService) {
    this.getPersonalFavs();
  }

  ngOnInit() {
  }

  getPersonalFavs(){
    this.usersService.getPersonalProfile(localStorage.getItem("id"), localStorage.getItem("token")).subscribe((res)=>{
      this.personalFavs = res["favorites"];
      console.log("FAVS", this.personalFavs)
    },(err)=>{
      console.log("err", err)
    })
  }

  deleteFromFavs(fav: string){
    let position = null;
    let cont = 0;
    this.personalFavs.forEach(pos => {
      if (pos == fav) {
        position = cont
      }
      cont++
    });
    if (position != null) {
      delete this.personalFavs[position];
      let data = {
        "favorites": this.personalFavs
      }
      this.usersService.patchFavorites(data);
    }
  }

  addToFavs(fav: string){
    this.personalFavs.push(fav);
    /* let data = {
      "favorites": this.personalFavs
    } */
    let data = ''
    console.log("DATA", data)
    this.usersService.patchFavorites(data);
  }

  checkFav(id: String){
  let res = false;
  this.personalFavs.forEach(fav => {
    if (fav == id) {
      console.log("AQUI", fav, id)
      res = true;
    }
    console.log("RES", res)
    return res;
  });
}

}