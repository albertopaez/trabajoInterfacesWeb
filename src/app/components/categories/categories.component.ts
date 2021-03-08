import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from 'src/app/services/movies.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  movies = [];
  personalFavs = [];
  isLogged = this.usersService.isLogged;
  entryTag;
  existsMovies = false;

  constructor(private route: ActivatedRoute, private moviesServices: MoviesService, private usersService: UsersService) {
    this.route.params.subscribe(params => this.entryTag = params)
    this.getPersonalFavs();
    this.getMovies()
  }

  ngOnInit() {
  }

  /**
   * Este metodo recoge todas las peliculas y las filtra para mostrar solo las que coincidan con la busqueda.
   * @param data Lista de todas las peliculas
   * @returns 
   */
  getTaggedMovies(data){
    let taggedMovies = [];
    let tag;
    data.forEach(movie => {
      tag = this.entryTag.tag;
      movie.tags.forEach(movieTag => {
        if(movieTag.toLowerCase().includes(tag.toLowerCase())){
          taggedMovies.push(movie);
          tag = "YA SE HA AÑADIDO LA PELICULA"
        }
      });
    });
    if(taggedMovies.length != 0){
      this.existsMovies = true;
    }
    return taggedMovies;
  }

  /**
   * Metodo que hace una petición de todas las peliculas y las almacena.
   */
  getMovies() {
    this.moviesServices.getMovies().subscribe((res: any[]) => {
      this.movies = this.getTaggedMovies(res);
    }, (err) => {
      console.log("err", err)
    })
  }

  /**
   * Metodo que almacena las ids de los favoritos del usuario.
   */
  getPersonalFavs() {
    this.usersService.getPersonalProfile(localStorage.getItem("id"), localStorage.getItem("token")).subscribe((res) => {
      this.personalFavs = res["favorites"];
      //this.getMovies()
    }, (err) => {
      console.log("err", err)
    })
  }

  /**
   * Este metodo elimina una pelicula de la lista de favoritos del usuario
   * @param fav ID de la pelicula
   */
  deleteFromFavs(fav: string) {
    let position = null;
    let cont = 0;
    this.personalFavs.forEach(pos => {
      if (pos == fav) {
        position = cont
      }
      cont++
    });
    if (position > -1) {
      delete this.personalFavs[position];
      this.personalFavs.splice(position, 1);
      let data = {
        "favorites": this.personalFavs
      }
      console.log("PERSONALFAVS", this.personalFavs)
      this.usersService.patchFavorites(data);
    }
  }

  /**
   * Este metodo añade una pelicula a la lista de favoritos del usuario
   * @param fav ID de la pelicula
   */
  addToFavs(fav: string) {
    console.log("PERSONALFAVS", this.personalFavs)
    this.personalFavs.push(fav);
    console.log("PERSONALFAVS", this.personalFavs)
    let data = {
      "favorites": this.personalFavs
    }
    console.log("DATA", data)
    this.usersService.patchFavorites(data);
  }

  /**
   * Este metodo comprueba si una pelicula es favorita o no del usuario.
   * @param id ID de la pelicula
   * @returns Booleano que es true si la pelicula es favorita y false si no.
   */
  checkFav(id: String) {
    let res = false;
    this.personalFavs.forEach(fav => {
      if (fav == id) {
        res = true;
      }
    });
    return res;
  }

}