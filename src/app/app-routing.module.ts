import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdvanceComponent } from './Components/1_MemberReg/advance/advance.component';
import { MainComponent } from './Components/1_MemberReg/main/main.component';
import { SupplyComponent } from './Components/1_MemberReg/supply/supply.component';
import { LoginComponent } from './Components/login/login.component';

const routes: Routes = [
  {path:'Main', component:MainComponent},
  {path:'', component:LoginComponent},
  {path:'Advance', component:AdvanceComponent},
  {path:'Supply', component:SupplyComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
