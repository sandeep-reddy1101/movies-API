import { HttpClient } from '@angular/common/http';
import { Component, HostListener, Input, OnInit, SimpleChange } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.css'],
})
export class SuggestionsComponent implements OnInit {

  @Input() _MOVIES : any[] = [];

  API_KEY : string = '52b1a0fb';

  columnClassForCard : string = '';
  cardHeightClass : string = '';
  moviesArray : any[] = [];
  viewedMoviesPresentInLocalStorage: string[] = [];
  movieDetailsArray : any[] = [];
  arrayLength: number = 0;
  lengthOfMoviesArray : number = 0;
  previousArrayLength : number = 0;
  scrHeight: any;
  scrWidth: any;

  //Host listener for detecting screen height and width
  @HostListener('window:resize', ['$event'])
  getScreenSize() {
    this.scrHeight = window.innerHeight;
    this.scrWidth = window.innerWidth;
    if(this.viewedMoviesPresentInLocalStorage && this.viewedMoviesPresentInLocalStorage.length > 0){
      this.updatedArrayLength();
    }
  }

  constructor(private http:HttpClient) {
  }

  ngOnInit(): void {
    let moviesInLocalStorage = localStorage.getItem('viewedMovies');
    if (moviesInLocalStorage && moviesInLocalStorage.length > 0) {
      this.viewedMoviesPresentInLocalStorage = JSON.parse(moviesInLocalStorage);
      this.lengthOfMoviesArray = this.viewedMoviesPresentInLocalStorage.length;
    }
    this.getMovieDetails();
    this.getScreenSize();
  }

  ngOnChanges(changes:SimpleChange){
    this.viewedMoviesPresentInLocalStorage = this._MOVIES;
    this.getMovieDetails();
  }

  //Function is used to retrive the movie details based on movie imdb id
  getMovieDetails(){
    let movieDetailsArray:any[] = [];
    this.viewedMoviesPresentInLocalStorage.forEach(
      id => {
        this.searchAPIbasedOnID(id).subscribe(
          res => {
            if(res.Response === 'True'){
              movieDetailsArray.push(res);
              this.movieDetailsArray = movieDetailsArray;
              
              if(this.movieDetailsArray.length === this.viewedMoviesPresentInLocalStorage.length){
                this.updateArray();
              }
            }
          }
        )
      }
    )
  }

  //Function to update length of array when screen width changes
  updatedArrayLength() {
    if (this.scrWidth > 992) {
      this.arrayLength = 4;
      this.columnClassForCard = 'col-3'
      this.cardHeightClass = '350px'
    } else if (this.scrWidth < 992 && this.scrWidth > 768) {
      this.arrayLength = 4;
      this.columnClassForCard = 'col-3'
      this.cardHeightClass = '230px'
    } else if (this.scrWidth < 768 && this.scrWidth > 576) {
      this.arrayLength = 3;
      this.columnClassForCard = 'col-4';
      this.cardHeightClass = '230px'
    } else if (this.scrWidth < 576) {
      this.arrayLength = 2;
      this.columnClassForCard = 'col-6';
      this.cardHeightClass = '300px'
    }
    
    // This is useful to call a function which will adjust the number on cards on screen when width of screen changes
    if(this.previousArrayLength !== this.arrayLength){
      this.previousArrayLength = this.arrayLength;

      //checking whether moviesArray has something and calling updateArray function
      this.movieDetailsArray.length>0 && this.updateArray();
    }
  }

  //Based on arraylength this function updated the array somthing like this [[a,b],[c,d]]
  updateArray(){
    let finalArray = [];
    const len = Math.ceil(this.lengthOfMoviesArray/this.arrayLength);
    let index = 0;

    for(let i=0;i<len;i++){
       const lastIndex = index + this.arrayLength;
       const a = this.movieDetailsArray.slice(index, lastIndex);
       index += this.arrayLength;
       finalArray.push(a);
     }

    this.moviesArray = finalArray;
  }

  //function to call backend api based on movie imdb id
  searchAPIbasedOnID(id:string):Observable<any>{
    const API_URL = `https://www.omdbapi.com/?apikey=${this.API_KEY}&`;
    return this.http.get<any>(API_URL + 'i=' + id);
  }
}
