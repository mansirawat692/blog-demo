import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http:HttpClient) { }
  login(email:string,pswd:string){
    return this.http.post<any>('http://localhost:3000/',{email,pswd}).
    pipe(
      map((token: string)=>{
        localStorage.setItem('blog-token',token)
        return token
      })
    )
  }
}
