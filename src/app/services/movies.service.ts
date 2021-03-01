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

}
