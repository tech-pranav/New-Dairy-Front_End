import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  Name:any="Testing Milk center"
  navbaropen: any=false;
  constructor(private router:Router) { }

  ngOnInit(): void {
    this.getData()
  }

  getData(){
    this.Name=sessionStorage.getItem("Name")
  }

  logout(){
    if(confirm("Do you want to logout?")){
      sessionStorage.removeItem("token")
 sessionStorage.removeItem("Name")
 sessionStorage.removeItem("UId")
this.router.navigate(["/"])
  }
  }

  navbarToggel(){
    this.navbaropen=!this.navbaropen
  }
}
