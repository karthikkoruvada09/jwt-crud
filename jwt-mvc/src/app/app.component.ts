import { Component } from '@angular/core';
import { ServeService } from './serve.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'jwt-mvc';
  constructor(private ser:ServeService,private router:Router){}

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/'])
  }
}
