import { Component } from '@angular/core';
import { ApiServicesService } from './api-services.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Services-app';
  ip_details : any = '';

  constructor(private ipService:ApiServicesService){}

  ngOnInit(){
    //Calling api services component
    //calling getip function to get the ip address data of the user
    this.ipService.getIP().subscribe(
      data=>{
        this.ip_details = data;
      },error=>{
        console.log('IP ERROR',error)
      }
    )
  }
}
