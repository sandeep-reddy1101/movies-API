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

  constructor(private activatedRoute : ActivatedRoute, private services:ApiServicesService) { }

  ngOnInit(): void {
    this.movieID = this.movieDetails =  this.errorMessage ='';
    this.movieID = this.activatedRoute.snapshot.params.id;
    console.log(this.movieID,'movie id');
    this.serviceCall();
  }

  serviceCall(){
    this.services.searchAPIbasedOnID(this.movieID).subscribe(
      response => {
        if(response.Response === 'True'){
          this.movieDetails = response;
        }else{
          this.errorMessage = 'Oops! Not able to find the movie';
        }
      },error => {
        console.log(error)
        this.errorMessage = "Some ERROR occured. Please try again";
      }
    )
  }

}
