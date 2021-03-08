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


   /**
    * Este metodo hace una petición a la API de todas las peliculas a la API
    * @returns Observable con la lista de peliculas almacenadas en la base de datos.
    */
  getMovies() {
    return this.http.get(`${this.constants.API_ENDPOINT}movies`);
  }

  /**
   * Este metodo realiza una petición a la API de una pelicula en concreto a la API
   * @param id String con la id de una pelicula.
   * @returns 
   */
  getMovieFromId(id: string){
    return this.http.get(`${this.constants.API_ENDPOINT}movies/`+id);
  }

  /**
   * Este metodo hace una petición a la API de tal manera que actualiza o crea una pelicula en función
   * de si la id que envia dentro del JSON coincide con una ya existente la base de datos o no.
   * @param data JSON con todos los valores necesarios para crear una pelicula.
   * @returns 
   */
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

  /**
   * Este metodo hace una petición a la API para eliminar una pelicula en concreto.
   * @param id Id de una pelicula
   * @returns 
   */
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
