import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ConstantsService } from 'src/app/services/constants.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {


  myMoviesId;
  myMovies = [];

  constructor( private http: HttpClient, private constants: ConstantsService ) {
    console.log("OOOOOOOOOOOOOOOOOOOOOOOOOHHHHHHHHHHHHH")
    //this.getMyMovies();
   }

  ngOnInit(): void {
  }


  getPersonalProfile(id: string, token: string) {
    const endpoint = this.constants.API_ENDPOINT;
    return this.http.get(`${this.constants.API_ENDPOINT}usuarios/`+id+'?access_token='+token);
  }

  getMovieFromId(id: string){
    return this.http.get(`${this.constants.API_ENDPOINT}movies/`);
  }

  getMyMovies(){
    this.getPersonalProfile(localStorage.getItem("id"), localStorage.getItem("token")).subscribe((res)=>{
      let aux:Array<string> = res["favorites"];
      console.log("res", res);
      console.log("getMoviesId", aux);
      aux.forEach(movieId => {
        if(typeof movieId === "string"){
          this.myMovies.push(this.getMovieFromId(movieId));
        }
      });
      console.log("myMovies", this.myMovies);
      
    },(err)=>{
      console.log(err);
      alert('Ha ocurrido un error al obtener el post: \n'+err.err)
    })
  }



}

//return this.http.get(`${this.constants.API_ENDPOINT}movies/`+id);