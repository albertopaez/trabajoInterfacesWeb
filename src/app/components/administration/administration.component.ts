import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MoviesService } from 'src/app/services/movies.service';
import { UsersService } from 'src/app/services/users.service';
import { MovieFormModel } from '../models/movieFormModel';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


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
  doc = new jsPDF();

  constructor(private http: HttpClient, private moviesServices: MoviesService, private usersService: UsersService) {
    this.getMovies();
  }

  ngOnInit() {
  }

  /**
   * Metodo que genera un PDF con la información de todas las peliculas.
   */
  generatePDF() {
    let infoPDF = "";
    /* const aux = document.getElementById("moviesContainer").innerHTML
    infoPDF = aux; */
    this.movies.forEach(movie => {
      infoPDF = infoPDF + "ID: " + movie.id + "\n\n";
      infoPDF = infoPDF + "Name: " + movie.name + "\n\n";
      infoPDF = infoPDF + "Synopsis: " + movie.synopsis + "\n\n";
      infoPDF = infoPDF + "Tags: " + movie.tags + "\n\n--------------------------------------\n\n";
    });
        
    this.doc.text(infoPDF, 10, 10);
    this.doc.save("movies documentation.pdf");
  }

  /* downloadPDF() {
    const DATA = document.getElementById('htmlData');
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };
    html2canvas(DATA, options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');

      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save("Documentation");
    });
  } */

  /**
   * Metodo que hace una petición de todas las peliculas y las almacena.
   */
  getMovies() {
    this.moviesServices.getMovies().subscribe((res: any[]) => {
      this.movies = res;
    }, (err) => {
      console.log("err", err)
    })
  }

  /**
   * Este metodo almacena las variables del modal de edición para que puedan ser usadas en la posterior
   * petición a la API.
   * @param id 
   * @param name 
   * @param synopsis 
   * @param image 
   * @param tags 
   */
  printEditModal(id: string, name: string, synopsis: string, image: string, tags: string[],) {
    console.log('TAGS', tags)

    this.movieName = name;
    this.movieSynopsis = synopsis;
    this.movieImage = image;
    this.movieTags = tags;
    this.movieId = id;
  }

  /**
   * Este metodo realiza la petición para editar una pelicula.
   */
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

  /**
   * Este metodo realiza la petición para crear una pelicula.
   */
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

  /**
   * Este metodo realiza la petición de eliminar una pelicula en concreto.
   * @param id 
   */
  deleteMovie(id){
    this.moviesServices.deleteMovie(id);
  }

}