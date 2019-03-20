import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServeService {

  constructor(private http:HttpClient) { }


  login(v):Observable<any>{
    console.log(v)

   return this.http.post('http://localhost:3000/login',v);
  }

  register(v):Observable<any>{
    console.log(v)
    return this.http.post('http://localhost:3000/register',v);
  }


  events():Observable<any>{
    return this.http.get('http://localhost:3000/events');

  }

  specials():Observable<any>{
    return this.http.get('http://localhost:3000/special')
  }


  getToken():any{
    return localStorage.getItem('token')
  }
}
