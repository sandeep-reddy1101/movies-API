import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  viewed_movies : any[] = [];
  errorMessage : string = ''
  allSearchedKeywords : any[] = [];
  searchesErrorMessage : string = '';

  constructor() { }

  ngOnInit(): void {
    //Initially calling these functions to load the local storage data into variables
    this.getviewedMoviesFromLocalStorage();
    this.getAllSearchedKeywordsFromLocalStorage();
  }

  //Function to retrive the values of viewed movies from local storage
  getviewedMoviesFromLocalStorage(){
    this.errorMessage = ''
    let movies = localStorage.getItem('viewedMovies');
    if(movies && JSON.parse(movies).length > 0){
      this.viewed_movies = JSON.parse(movies).reverse();
    }else{
      this.errorMessage = 'Currently there are no movies to show'
      this.viewed_movies = [];
    }
  }

  //Function to retrieve the values of allSeaches from local storage
  getAllSearchedKeywordsFromLocalStorage(){
    this.allSearchedKeywords = [];
    this.searchesErrorMessage = '';
    let keywords = localStorage.getItem('allSearches');
    if(keywords && JSON.parse(keywords).length > 0){
      this.allSearchedKeywords = JSON.parse(keywords).reverse();
    }else{
      this.searchesErrorMessage = 'Currently there are no searched keywords';
    }
  }

  //Function to delete a particular movie from the viewedMovies in local storage
  deleteMovieFromLocalStorage(id:string){
    let new_array = [];
    new_array = this.viewed_movies.filter(movie => {
      if(movie.imdbID != id){
        return true
      }else{
        return false
      }
    })
    console.log(new_array)
    localStorage.setItem('viewedMovies',JSON.stringify(new_array.reverse()));
    this.getviewedMoviesFromLocalStorage();
  }

  //Function to delete a particular value from the allSeaches in local storage
  deleteSearchedKeywordsFromLocalStorage(keyword:string){
    let new_array = [];
    new_array = this.allSearchedKeywords.filter(data=>{
      if(data.searchedText != keyword){
        return true
      }else{
        return false
      }
    });
    localStorage.setItem('allSearches',JSON.stringify(new_array.reverse()));
    this.getAllSearchedKeywordsFromLocalStorage();
  }

  //Function to clear all the values of the key in local storage
  clearItemFromLocalStorage(item:string){
    localStorage.removeItem(item);
    if(item === 'allSearches'){
      this.getAllSearchedKeywordsFromLocalStorage();
    }else if(item === 'viewedMovies'){
      this.getviewedMoviesFromLocalStorage();
    }
  }

}
