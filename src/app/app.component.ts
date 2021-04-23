import { Component } from '@angular/core';
import { ApiServicesService } from './api-services.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Services-app';

  constructor(private ipService:ApiServicesService){}

  ngOnInit(){
    this.ipService.getIP().subscribe(
      data=>{
        console.log('IP address details',data)
      },error=>{
        console.log('IP ERROR',error)
      }
    )
  }
}
