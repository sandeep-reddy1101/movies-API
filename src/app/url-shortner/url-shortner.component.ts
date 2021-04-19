import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-url-shortner',
  templateUrl: './url-shortner.component.html',
  styleUrls: ['./url-shortner.component.css']
})
export class URLShortnerComponent implements OnInit {

  URL : string = '';
  shortURL : string = '';

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }

  urlSubmitFunc(urlText:string){
    if(urlText){
      this.URL = urlText;
      this.fetchFromAPI().subscribe(
        response => {
          if(response){
            console.log('response', response)
            this.shortURL = response
          }
        },error=>{
          console.error(error.error)
        }
      );
    }
  }

  fetchFromAPI():Observable<any>{
    const options = {
      headers : {
        'content-type': 'application/x-www-form-urlencoded',
      'x-rapidapi-key': '035025b29amshcf2b8564cf5306cp1a161ejsne1fbcf303481',
      'x-rapidapi-host': 'url-shortener-service.p.rapidapi.com'
      }
    }
    const postData = {
      "url": "https://google.com/"
    }
    console.log(this.URL,postData)
    return this.http.post<any>('https://url-shortener-service.p.rapidapi.com/shorten',postData, options);
  }

}
