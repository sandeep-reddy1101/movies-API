import { Component, HostListener, Input, OnInit, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.css'],
})
export class SuggestionsComponent implements OnInit {

  @Input() _MOVIES : any[] = [];

  columnClassForCard : string = '';
  cardHeightClass : string = '';
  moviesArray : any[] = [];
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
    if(this.movieDetailsArray && this.movieDetailsArray.length > 0){
      this.updatedArrayLength();
    }
  }

  constructor() {
  }

  ngOnInit(): void {
    this.movieDetailsArray = this._MOVIES;
    this.lengthOfMoviesArray = this.movieDetailsArray.length;
    this.getScreenSize();
  }

  ngOnChanges(changes:SimpleChange){
    this.movieDetailsArray = this._MOVIES;
    this.updateArray();
  }

  //Function to update length of array when screen width changes
  updatedArrayLength() {
    if (this.scrWidth > 1024) {
      this.arrayLength = 4;
      this.columnClassForCard = 'col-3'
      this.cardHeightClass = '320px'
    } else if (this.scrWidth <= 1024 && this.scrWidth > 768) {
      this.arrayLength = 4;
      this.columnClassForCard = 'col-3'
      this.cardHeightClass = '270px'
    } else if (this.scrWidth <= 768 && this.scrWidth > 576) {
      this.arrayLength = 3;
      this.columnClassForCard = 'col-4';
      this.cardHeightClass = '250px'
    } else if (this.scrWidth <= 576) {
      this.arrayLength = 2;
      this.columnClassForCard = 'col-6';
      this.cardHeightClass = '210px'
    }
    
    // This is useful to call a function which will adjust the number on cards on screen when width of screen changes
    if(this.previousArrayLength !== this.arrayLength){
      this.previousArrayLength = this.arrayLength;

      //checking whether moviesDetailsArray has something and calling updateArray function
      this.movieDetailsArray.length>0 && this.updateArray();
    }
  }

  //Based on arraylength this function updated the array somthing like this [[a,b],[c,d]]
  updateArray(){

    //reversing the array
    let x = [...this.movieDetailsArray].reverse();
    this.movieDetailsArray = x;

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

}
