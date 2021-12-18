import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Sevices/api.service';
import { TablesService } from 'src/app/Sevices/tables.service';

@Component({
  selector: 'app-currbill',
  templateUrl: './currbill.component.html',
  styleUrls: ['./currbill.component.css']
})
export class CurrbillComponent implements OnInit {
  Cname: any;
  Ctype: any;
  Cnum: any;
  name: any
  MCtype: any;
  Ifcow: any;
  Ifbuff: any;
  onload: any;
  valid: any;
  err: any;
  totalMilk: any
  totalRate: any
  morMilk: any
  morRate: any
  eveMilk: any
  eveRate: any
  CurrentBill: any
  Cdate: any;
  Cmonth: any;
  Cyear: any;
  from: any;
  to: any;
  order:string = "date"


  constructor(private _serv: TablesService, private _api: ApiService) { }

  ngOnInit(): void {
    this.serviceCalled()
    this.sendDate()
  }
  serviceCalled() {
    this.Cname = this._serv.Cname
    this.Ctype = this._serv.Ctype
    this.Cnum = this._serv.Cnum
    if (this.Ctype == "Buffalow") {
      this.MCtype = "म्हैस"
      this.Ifcow = false
      this.Ifbuff = true
    }
    else {
      this.MCtype = "गाय"
      this.Ifbuff = false
      this.Ifcow = true
    }
  }


  API(from: any, to: any) {
    this._api.getBillData(this.Cnum, `${from}`, `${to}`).subscribe((res: any) => {
      this.onload = true
      this.valid = true
      console.log(res);
      this.CurrentBill=res

    }, (err: any) => {
      console.log(err)
      this.err = "नोंदी नाहीत"
      this.onload = true
      this.valid = false

    })

  }



  sendDate() {
    
    var today = new Date()
    this.Cdate = today.getDate()
    this.Cmonth = today.getMonth() + 1
    this.Cyear = today.getFullYear()

    if (this.Cdate >= 1 && this.Cdate <= 10) {
      console.log("1");

      this.from = `${this.Cmonth}/01/${this.Cyear}`
      this.to = `${this.Cmonth}/10/${this.Cyear}`
      this.API(this.from, this.to)
    }
    else if (this.Cdate >= 11 && this.Cdate <= 20) {
      console.log("2");

      this.from = `${this.Cmonth}/11/${this.Cyear}`
      this.to = `${this.Cmonth}/20/${this.Cyear}`
      this.API(this.from, this.to)
    }
    else if (this.Cdate >= 21 && this.Cdate <= 31) {
      console.log("3");
      if (this.Cmonth == 1) {
        this.from = `${this.Cmonth}/21/${this.Cyear}`
        this.to = `01/30/${this.Cyear + 1}`
        this.API(this.from, this.to)
      }
      else {
        this.from = `${this.Cmonth}/21/${this.Cyear}`
        this.to = `${this.Cmonth + 1}/31/${this.Cyear}`
        this.API(this.from, this.to)
      }
    }

  }


}
