import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiServicesService } from '../api-services.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  movieID:string = '';
  movieDetails: any;
  errorMessage : string = '';
  loadingFlag : boolean = false;

  constructor(private activatedRoute : ActivatedRoute, private services:ApiServicesService) { }

  ngOnInit(): void {
    this.loadingFlag = true
    this.movieID = this.movieDetails =  this.errorMessage ='';
    this.movieID = this.activatedRoute.snapshot.params.id;
    this.serviceCall();
  }

  serviceCall(){
    //Calling the service component function
    this.services.searchAPIbasedOnID(this.movieID).subscribe(
      response => {
        if(response.Response === 'True'){
          this.movieDetails = response;
          this.loadingFlag = false;
        }else{
          this.loadingFlag = false;
          this.errorMessage = 'Oops! Not able to find the movie';
        }
      },error => {
        this.loadingFlag = false
        console.log(error)
        this.errorMessage = "Some ERROR occured. Please try again";
      }
    )
  }

}
