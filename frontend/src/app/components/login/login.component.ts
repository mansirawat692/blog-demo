import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup | undefined
  constructor(private auth:AuthenticationService) { }

  ngOnInit(): void {
  }
  login(){
    return this.auth.login('mansi@rawat','1234')
  }

}
