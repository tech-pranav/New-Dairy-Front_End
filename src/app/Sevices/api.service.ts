import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // Local URL
 baseUrl=`http://localhost:3001`
 UId=sessionStorage.getItem('UId')
  constructor(private http:HttpClient ) { }



  // Login URl
  LoginAuth(username:any,password:any){
    return this.http.get(`${this.baseUrl}/getCred/${username}/${password}`)
    }

// GetAll Members
getallMem(){
  return this.http.get(`${this.baseUrl}/getallMem/${this.UId}`)
}


// Get Todayts Data
getTodaysData(ehours:any,date:any){
  date=encodeURIComponent(date)
    return this.http.get(`${this.baseUrl}/GetTodayData/${this.UId}/${ehours}/${date}`)
  }

  //Edit Daily Data 
  EditData(data:any,id:any){
    console.log(id);
    return this.http.put(`${this.baseUrl}/EditDataDB/${id}`,data) 
  }

  //Post To Daily Data 
  postToData(data:any){
    return this.http.post(`${this.baseUrl}/addDataDB`,data) 
  }


  // Get  Current && Last Bill 
  getBillData(No:any,from:any,to:any){
    from=encodeURIComponent(from)
    to=encodeURIComponent(to)
    return this.http.get(`${this.baseUrl}/GetBillData/${this.UId}/${No}/${from}/${to}`)
  }



  // Get Supply Balance
  GetBalance(data:any){
    return this.http.post(`${this.baseUrl}/GetSupplyBalance`,data)
  }


// Find Bill
FindBill(inv_no:any,No:any){
  inv_no=encodeURIComponent(inv_no)
  return this.http.get(`${this.baseUrl}/findBill/${this.UId}/${inv_no}/${No}`)
}

// Advance and Supply POST api
PostSupply(data:any){
  return this.http.post(`${this.baseUrl}/postEntry`,data)
}


// Post Bill
postBill(data:any){
  return this.http.post(`${this.baseUrl}/postBill`,data)
}


// GetSupply
GetSupply(data:any){
  return this.http.post(`${this.baseUrl}/GetEntry`,data)
}

}
