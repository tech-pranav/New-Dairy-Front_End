import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/Sevices/api.service';
import { TablesService } from 'src/app/Sevices/tables.service';

@Component({
  selector: 'app-supply',
  templateUrl: './supply.component.html',
  styleUrls: ['./supply.component.css']
})
export class SupplyComponent implements OnInit {
  //  Boolean
  onload: any = false

  // variable
  order: any = "date"
  data: any = []
  balance: any = 0
  currentDate = formatDate(new Date(), 'YYYY-MM-dd', 'en')
  Cnum: any;
  Cname: any;
  types: any = ["सुग्रास", "टि.एम.आर", "फर्टिमन प्लस","फर्टिमन", "भेट शुल्क", "इतर"];
  typeRates: any = [1060, 200, 130, 80, 60, 0]
  detailsForm: any = new FormGroup({
    'Amount': new FormControl({ value: this.typeRates[0], disabled: true }, [Validators.required]),
    'Rate': new FormControl(this.typeRates[0], [Validators.required]),
    'bags': new FormControl(1, [Validators.required]),
    'Date': new FormControl(this.currentDate, [Validators.required]),
    'SupType': new FormControl(this.types[0], [Validators.required]),
  })
  val: any;
  isClicked: any = false
  setRate: any;
  constructor(private _serv: TablesService, private _api: ApiService) { }

  ngOnInit(): void {
    this.getServData()
  }

  getServData() {
    this.Cnum = this._serv.Cnum
    this.Cname = this._serv.Cname
    this.Api()
  }

  Api() {
    var temp = {
      UId: sessionStorage.getItem("UId"),
      No: this.Cnum,
      type: "supply",
    }
    this._api.GetSupply(temp).subscribe((res:any) => {
      this.data = res
      this.onload = true
      this.checkBal(this.data)
    }, (err:any) => {
      this.onload = true
      console.log(err);
    })
  }

  changeRate() {

    
    console.log(this.detailsForm.get('SupType').value);
    this.setRate = (this.detailsForm.get('SupType').value == this.types[0]) ? this.typeRates[0]
      : (this.detailsForm.get('SupType').value == this.types[1]) ? this.typeRates[1]
        : (this.detailsForm.get('SupType').value == this.types[2]) ? this.typeRates[2]
          : (this.detailsForm.get('SupType').value == this.types[3]) ? this.typeRates[3]
          : (this.detailsForm.get('SupType').value == this.types[4]) ? this.typeRates[4]
            : this.typeRates[5];
this.detailsForm.get("Rate").setValue(this.setRate);
this.detailsForm.get("Amount").setValue(this.setRate);
  }

  calcu() {
    var rate = this.detailsForm.get('Rate').value
    var bag = this.detailsForm.get('bags').value
    var amount
    if (rate && bag) {
      this.val = false
      amount = rate * bag
      this.detailsForm.controls['Amount'].setValue(amount);
    }
    else {
      this.val = true
    }
  }

  checkBal(data: any) {
    var add = 0
    var cut = 0
    data.forEach((ele: any) => {
      if (ele.addAmount) { add = add + parseFloat(ele.addAmount) }
      if (ele.cutAmount) { cut = cut + parseFloat(ele.cutAmount) }
    });
    this.balance = add - cut
  }

  postData() {
    this.isClicked = true
    let date = this.detailsForm.get('Date').value
    var rate = this.detailsForm.get('Rate').value
    var bag = this.detailsForm.get('bags').value
    var amount = this.detailsForm.get('Amount').value
    var supType = this.detailsForm.get('SupType').value
    var temp: any;

    let newdate = formatDate(new Date(date), 'MM/dd/YYYY', 'en')
    if (rate && bag && amount) {
      temp = {
        Name: this.Cname,
        No: this.Cnum,
        type: "supply",
        date: newdate,
        addAmount: amount,
        rate: rate,
        bag: bag,
        supType: supType,
        UId: sessionStorage.getItem("UId")
      }
      this._api.PostSupply(temp).subscribe((res:any) => {
        this.data.push(temp)
        this.null()
        this.checkBal(this.data)
        this.isClicked = false
        this.detailsForm.controls['bags'].setValue("");
      }, (err:any) => {
        this.null()
        console.log(err);
        this.isClicked = false
        this.detailsForm.controls['bags'].setValue("");
      })
    }
    else {
      console.log("errr");

    }
  }


  null() {
    this.detailsForm.controls['Amount'].setValue(1060);
    this.detailsForm.controls['Rate'].setValue(1060);
    this.detailsForm.controls['bags'].setValue(1);
  }
}
