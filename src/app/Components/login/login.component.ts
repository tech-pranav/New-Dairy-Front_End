import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/Sevices/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  err:any
  temp:any
  isClicked:any=false
  
  
  LoginForm :any = new FormGroup({
      'Username': new FormControl(null, [Validators.required]),
      'Password': new FormControl(null, [Validators.required]),
    });
  
  constructor(private _api:ApiService,private router:Router) { }

  ngOnInit(): void {
  }


  submit() {
    this.isClicked = true
    let uname = this.LoginForm.get('Username').value
    let pass = this.LoginForm.get('Password').value
    this._api.LoginAuth(uname, pass).subscribe(
      res => {
        this.isClicked = false
        this.temp = res
        sessionStorage.setItem('UId', this.temp.Id);
        sessionStorage.setItem('Name', this.temp.Name);
        sessionStorage.setItem('token', this.temp.token);
        this._api.UId = this.temp.Id;
        this.router.navigate([`/Main`]);
        this.err = '';
      },
      err => {
        this.isClicked = false
        this.err = err.error.message
      })
  }
}
