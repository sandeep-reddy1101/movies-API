import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  movieTitle : string = '';
  moviesArray: any[] = [];
  API_KEY : string = '52b1a0fb';
  movieDetails : any;
  errorMessage : any = '';
  movieDetailsFlag : boolean = false;
  loadingFlag : boolean = false;
  searchedMoviesInLocalStorage : string[] = [];
  viewedMoviesInLocalStorage : string[] = [];

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.checkingAndInitializingLocalStorage();
  }

  // This function will be called when user clicks on search button
  submitFunc(title:string){
    this.errorMessage = '';
    this.moviesArray = [];
    this.movieDetailsFlag = false;
    if(title){
      this.loadingFlag = true;
      this.movieTitle = title;
      this.searchFunc();

      this.searchedMoviesInLocalStorage.push(title);
      this.setArrayToLocalStorage('searchedMovies',this.searchedMoviesInLocalStorage);
    }
  }

  callFunc(id:string){
    this.movieDetails = '';
    this.loadingFlag = true;
    this.movieDetailsFlag = true;
    this.searchAPIbasedOnID(id).subscribe(
      response=>{
      // IF response is true then assigning the response to movieDetails
      if(response.Response === 'True'){
        this.loadingFlag = false
        this.movieDetails = response;
        console.log(this.movieDetails);
      }else{
        // if response is false
        this.loadingFlag = false;
        this.errorMessage = 'Oops! Movie is not there';
      }
    },error=>{
      // If ERROR occured from backend
      this.loadingFlag = false;
      this.errorMessage = "Some ERROR occured. Please try again!!!"
      console.log(error.error)
    }
    )

    this.viewedMoviesInLocalStorage.push(id);
    this.setArrayToLocalStorage('viewedMovies',this.viewedMoviesInLocalStorage)
  }

  searchFunc(){
    this.searchAPIbasedOnText().subscribe(
      data=>{
        console.log(data)
        // if response if TRUE then assigning the array to moviesArray
        if(data.Response === 'True'){
          console.log('movies in array',data);
          this.loadingFlag = false;
          this.moviesArray = data.Search.sort((a:any,b:any) => b.Year - a.Year); // assigning the sorted array according to year
        }else{
          // if response is false
          this.loadingFlag = false;
          this.errorMessage = 'Oops! movie is not there';
        }
      },err=>{
        // if error occured from backend
        console.log('search error',err);
        this.loadingFlag = false;
        this.errorMessage = "Some ERROR occured. Please try again!!!"
      }
    )
  }

  // This function is called when we want to search the movie from API based on IMDB ID
  searchAPIbasedOnID(id:string):Observable<any>{
    const API_URL = `https://www.omdbapi.com/?apikey=${this.API_KEY}&`;
    return this.http.get<any>(API_URL + 'i=' + id);
  }

  //This function is called when we want to seach the movies from API based on TEXT entered by user
  searchAPIbasedOnText():Observable<any>{
    const API_URL = `https://www.omdbapi.com/?apikey=${this.API_KEY}&`;
    return this.http.get<any>(API_URL + 's=' + this.movieTitle);
  }

  //Function to check whether searchedMovies variable is present in localstorage or not
  //If not then it will initialize searchedMovies with empty array
  checkingAndInitializingLocalStorage(){
    let searchedMovies = localStorage.getItem('searchedMovies');
    let viewedMovies = localStorage.getItem('viewedMovies');
    if(searchedMovies){
      console.log(JSON.parse(searchedMovies));
      this.searchedMoviesInLocalStorage = JSON.parse(searchedMovies);
    }else{
      localStorage.setItem('searchedMovies',JSON.stringify([]));
    }

    if(viewedMovies){
      console.log(JSON.parse(viewedMovies));
      this.viewedMoviesInLocalStorage = JSON.parse(viewedMovies);
    }else{
      localStorage.setItem('viewedMovies',JSON.stringify([]));
    }
  }

  //Function to set array to searchedMovies variable in local storage
  setArrayToLocalStorage(variableName:string, arr:string[]){
    localStorage.setItem(variableName,JSON.stringify(arr));
  }

}
