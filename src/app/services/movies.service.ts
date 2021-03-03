import { Injectable } from '@angular/core';
import { ConstantsService } from './constants.service';
import { HttpClient } from '@angular/common/http';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  actualMovie = null;

  constructor(private constants: ConstantsService, private http: HttpClient, private usersService: UsersService) {
   }


  getMovies() {
    return this.http.get(`${this.constants.API_ENDPOINT}movies`);
  }

  getMovieFromId(id: string){
    return this.http.get(`${this.constants.API_ENDPOINT}movies/`+id);
  }

  putMovie(data){
    console.log("DATA", data)
    return this.http.put(`${this.constants.API_ENDPOINT}movies/`+'?access_token='+localStorage.getItem("token"), data).subscribe(
      (response)=>{
        window.location.reload();
      },(error) => {
        console.log('error',error.error.error.message)
        alert('Parametros invalidos')
        window.location.reload();
      }
      ); 
  }

  deleteMovie(id){
    console.log("DELETE MOVIE", id)
    return this.http.delete(`${this.constants.API_ENDPOINT}movies/`+id+'?access_token='+localStorage.getItem("token")).subscribe(
      (response)=>{
        window.location.reload();
      },(error) => {
        console.log('error',error.error.error.message)
      }
      ); 
  }

}
