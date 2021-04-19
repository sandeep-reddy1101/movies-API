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

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }

  submitFunc(title:string){
    this.errorMessage = '';
    this.moviesArray = [];
    this.movieDetailsFlag = false;
    this.loadingFlag = true;
    if(title){
      this.movieTitle = title;
      this.searchFunc();
    }
  }

  callFunc(id:string){
    this.movieDetails = '';
    this.loadingFlag = true;
    this.movieDetailsFlag = true;
    this.callAPI(id).subscribe(response=>{
      if(response.Response === 'True'){
        this.loadingFlag = false
        this.movieDetails = response;
        console.log(this.movieDetails);
      }else{
        this.errorMessage = 'Not able to find the movie';
      }
    },error=>{
      console.log(error.error)
    }
    )
  }

  searchFunc(){
    this.searchAPI().subscribe(
      data=>{
        if(data.Response === 'True'){
          console.log('movies in array',data);
          this.loadingFlag = false;
          this.moviesArray = data.Search.sort((a:any,b:any) => b.Year - a.Year); // assigning the sorted array according to year
        }else{
          this.errorMessage = 'Not able to find the movie';
        }
      },err=>{
        console.log('search error',err);
        
      }
    )
  }

  callAPI(id:string):Observable<any>{
    const API_URL = `http://www.omdbapi.com/?apikey=${this.API_KEY}&`;
    return this.http.get<any>(API_URL + 'i=' + id);
  }

  searchAPI():Observable<any>{
    const API_URL = `http://www.omdbapi.com/?apikey=${this.API_KEY}&`;
    return this.http.get<any>(API_URL + 's=' + this.movieTitle);
  }

}
