import { Component, OnInit } from '@angular/core';
import { ApiServicesService } from '../api-services.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  movieTitle : string = '';
  moviesArray: any[] = [];
  movieDetails : any;
  errorMessage : any = '';
  movieDetailsFlag : boolean = false;
  loadingFlag : boolean = false;
  searchedMoviesInLocalStorage : string[] = [];
  viewedMoviesInLocalStorage : any[] = [];

  constructor(private services:ApiServicesService) { }

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
    //Calling API service component
    this.services.searchAPIbasedOnID(id).subscribe(
      response=>{
      // IF response is true then assigning the response to movieDetails
      if(response.Response === 'True'){
        this.loadingFlag = false
        this.movieDetails = response;

        this.removeMovieFromLocalStorage(this.movieDetails);

        //Storing the movieDetails which user viewed in local storage variable
        this.viewedMoviesInLocalStorage.push(this.movieDetails);
        this.setArrayToLocalStorage('viewedMovies',this.viewedMoviesInLocalStorage);

      }else{
        // if response is false
        this.loadingFlag = false;
        this.errorMessage = 'Oops! Movie is not there';
      }
    },error=>{
      // If ERROR occured from backend
      this.loadingFlag = false;
      this.errorMessage = "Some ERROR occured. Please try again!!!"
      console.log('ERROR from backend',error.error)
    }
    )
  }

  searchFunc(){
    //Calling API services component
    this.services.searchAPIbasedOnText(this.movieTitle).subscribe(
      data=>{

        // if response if TRUE then assigning the array to moviesArray
        if(data.Response === 'True'){
          this.loadingFlag = false;

          //Sorting the array according to year and assigning to moviesArray variable
          this.moviesArray = data.Search.sort((a:any,b:any) => b.Year - a.Year);

        }else{
          // if response is false
          this.loadingFlag = false;
          this.errorMessage = 'Oops! movie is not there';
        }
      },err=>{
        // if error occured from backend
        console.log('error from backend',err);
        this.loadingFlag = false;
        this.errorMessage = "Some ERROR occured. Please try again!!!"
      }
    )
  }

  //Function to check whether searchedMovies variable is present in localstorage or not
  //If not then it will initialize searchedMovies with empty array
  checkingAndInitializingLocalStorage(){
    this.initializeSearchedMovies();
    this.initializeViewedMovies();
  }

  //This function checks local storage for search and assign searched movies to variable
  initializeSearchedMovies(){
    let searchedMovies = localStorage.getItem('searchedMovies');
    if(searchedMovies){
      this.searchedMoviesInLocalStorage = JSON.parse(searchedMovies);
    }else{
      localStorage.setItem('searchedMovies',JSON.stringify([]));
    }
  }

  //This function checks local storage for viewed movies by user and assign them to variable
  initializeViewedMovies(){
    let viewedMovies = localStorage.getItem('viewedMovies');
    if(viewedMovies){
      this.viewedMoviesInLocalStorage = JSON.parse(viewedMovies);
    }else{
      localStorage.setItem('viewedMovies',JSON.stringify([]));
    }
  }

  //Function to set array to searchedMovies variable in local storage
  setArrayToLocalStorage(variableName:string, arr:any[]){
    //This if else is useful to restrict the movies to 20 which are stored in local storage
    if(arr.length >= 21){
      localStorage.setItem(variableName,JSON.stringify(arr.slice(1,21)));
    }else{
      localStorage.setItem(variableName,JSON.stringify(arr));
    }

    if(variableName === 'viewedMovies'){
      this.initializeViewedMovies();
    }else if(variableName === 'searchedMovies'){
      this.initializeSearchedMovies();
    }
  }

  removeMovieFromLocalStorage(movie:any){
    this.viewedMoviesInLocalStorage = this.viewedMoviesInLocalStorage.filter(data=>{
      if(data.imdbID === movie.imdbID){
        return false
      }else{
        return true
      }
    })
  }

}
