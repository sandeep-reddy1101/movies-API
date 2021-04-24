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
    this.getviewedMoviesFromLocalStorage();
    this.getAllSearchedKeywordsFromLocalStorage();
  }

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

  clearItemFromLocalStorage(item:string){
    localStorage.removeItem(item);
    if(item === 'allSearches'){
      this.getAllSearchedKeywordsFromLocalStorage();
    }else if(item === 'viewedMovies'){
      this.getviewedMoviesFromLocalStorage();
    }
  }

}
