import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServicesService {

  API_KEY:string = '52b1a0fb';

  constructor(private http:HttpClient) { }

  //Function searches movies based on ID
  searchAPIbasedOnID(id:string):Observable<any>{
    const API_URL = `https://www.omdbapi.com/?apikey=${this.API_KEY}&`;
    return this.http.get<any>(API_URL + 'i=' + id);
  }

  //Function searches movies based on user input
  searchAPIbasedOnText(movieText:string):Observable<any>{
    const API_URL = `https://www.omdbapi.com/?apikey=${this.API_KEY}&`;
    return this.http.get<any>(API_URL + 's=' + movieText);
  }
}
