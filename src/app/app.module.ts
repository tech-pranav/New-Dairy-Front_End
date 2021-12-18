import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdvanceComponent } from './Components/1_MemberReg/advance/advance.component';
import { SupplyComponent } from './Components/1_MemberReg/supply/supply.component';
import { SpinnerComponent } from './Components/spinner/spinner.component';
import { HeaderComponent } from './Components/header/header.component';
import { MainComponent } from './Components/1_MemberReg/main/main.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './Components/login/login.component';
import { LastbillComponent } from './Components/1_MemberReg/lastbill/lastbill.component';
import { CurrbillComponent } from './Components/1_MemberReg/currbill/currbill.component';
import { OrderModule } from 'ngx-order-pipe';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    AdvanceComponent,
    SupplyComponent,
    SpinnerComponent,
    HeaderComponent,
    LastbillComponent,
    CurrbillComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    OrderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
