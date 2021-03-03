import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MoviesService } from 'src/app/services/movies.service';
import { UsersService } from 'src/app/services/users.service';
import { MovieFormModel } from '../login/movieFormModel';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent implements OnInit {

  movies = [];
  personalFavs = [];
  isLogged = this.usersService.isLogged;
  model = new MovieFormModel('', '', '', '', []);
  movieName = '';
  movieSynopsis = '';
  movieImage = '';
  movieTags = [];
  movieId = '';

  constructor(private http: HttpClient, private moviesServices: MoviesService, private usersService: UsersService) {
    this.getMovies();
  }

  ngOnInit() {
  }

  getMovies() {
    this.moviesServices.getMovies().subscribe((res: any[]) => {
      this.movies = res;
    }, (err) => {
      console.log("err", err)
    })
  }

  printEditModal(id: string, name: string, synopsis: string, image: string, tags: string[],) {
    console.log('TAGS', tags)

    this.movieName = name;
    this.movieSynopsis = synopsis;
    this.movieImage = image;
    this.movieTags = tags;
    this.movieId = id;
  }

  onSubmitEdit(){
    document.getElementById('editModal').click();
    if (this.model.id == ''){
      this.model.id = this.movieId;
    }
    if (this.model.name == ''){
      this.model.name = this.movieName;
    }
    if (this.model.synopsis == ''){
      this.model.synopsis = this.movieSynopsis;
    }
    if (this.model.image == ''){
      this.model.image = this.movieImage;
    }
    if (this.model.tags[0] == null){
      this.model.tags = this.movieTags;
    }else{
      this.model.tags = this.model.tags.split(',');
    }
    this.moviesServices.putMovie(this.model);
  }

  onSubmitCreate(){
    document.getElementById('createModal').click();
    if(this.model.tags.length == 0){
      console.log("TAGS", this.model.tags)
    }else{
      this.model.tags = this.model.tags.split(',');
    }
    delete this.model.id;
    this.moviesServices.putMovie(this.model);
  }

  deleteMovie(id){
    this.moviesServices.deleteMovie(id);
  }

}