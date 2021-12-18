import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/Sevices/api.service';
import { TablesService } from 'src/app/Sevices/tables.service';

@Component({
  selector: 'app-lastbill',
  templateUrl: './lastbill.component.html',
  styleUrls: ['./lastbill.component.css']
})
export class LastbillComponent implements OnInit {
 // Boolean
 onload: any = false
 valid: any

 // variable
 order: string = "date"
 lastBill: any = []
 Cname: any;
 Ctype: any;
 Cnum: any;
 onPrintShow: any;
 name: any;
 MCtype: any;
 Ifcow: any;
 Ifbuff: any;

 err: any;
 Cdate: any;
 Cmonth: any;
 Cyear: any;
 totalMilk: any;
 lastDate: any;
 balance: any;
 detailsForm: any = new FormGroup({
   'Adv': new FormControl(0, [Validators.required]),
   'Sup': new FormControl(0, [Validators.required]),
   'Saving': new FormControl(0, [Validators.required]),
   'Balance': new FormControl(0, [Validators.required]),
 })
 subTotal: any;
 totalRate: any;
 totalDeduct: any;
 last: any;
 from: any;
 to: any;
 err_p: any
 invNo: any;
 exist: any;
 temp: any;
 onload_1: any;
 clicked: any;
 morMilk: any;
 morRate: any;
 eveMilk: any;
 eveRate: any;
 currentDate: any = formatDate(new Date(), 'MM/dd/YYYY', 'en')
  constructor(private _api: ApiService, private _serv: TablesService) { }

  ngOnInit(): void {
this.serviceCall()
this.pastDate()
  }
//   findBill() {
//     this._api.FindBill(this.invNo, this.Cnum).subscribe(
//       (res:any) => {
//         this.temp = res
//         this.detailsForm.controls['Adv'].setValue(this.temp[0].adv);
//         this.detailsForm.controls['Sup'].setValue(this.temp[0].supply);
//         this.detailsForm.controls['Saving'].setValue(this.temp[0].bank);
//         console.log("this.temp[0].balance", this.temp[0].balance);
//         this.detailsForm.controls['Balance'].setValue(this.temp[0].balance ? this.temp[0].balance : 0);
//         this.totalRate = this.temp[0].totalRate
//         this.totalDeduct = this.temp[0].cutting
//         this.subTotal = this.temp[0].subAmount
//         this.exist = true
//         this.onload_1 = true
//       }, (err:any) => {
//         this.exist = false
//         this.onload_1 = true
//       }
//     )
//   }






//   API(from: any, to: any) {
//     this._api.getBillData(this.Cnum, `${from}`, `${to}`).subscribe(res => {
//       this.valid = true
//       // this.getCurrentBill(res)
//       this.lastBill=[]
//       this.lastBill=res
//       console.log("LAstBil",res);
      

//       var temp = {
//         No: this.Cnum,
//         UId: sessionStorage.getItem("UId")
//       }
//       this._api.GetBalance(temp).subscribe((result:any) => {
//         this.balance = result
//         this.detailsForm.controls['Balance'].setValue(this.balance);
//         this.findBill()
//         this.onload = true
//       },
//         (error:any) => {
//           this.onload = true
//           this.balance = 0
//           this.detailsForm.controls['Balance'].setValue(this.balance);
//         })
//     }, err => {
//       this.err = "नोंदी नाहीत"
//       this.onload = true
//       this.valid = false
//     }
//     )
//   };



//   calcu() {
//     var adv = this.detailsForm.get('Adv').value
//     var sup = this.detailsForm.get('Sup').value
//     var sav = this.detailsForm.get('Saving').value
//     var Bal = this.balance
//     if (adv || sup || sav) {
//       var sum = parseFloat(adv) + parseFloat(sup) + parseFloat(sav)
//       if (Bal) {
//         var NewBal = parseFloat(Bal) - parseFloat(sup)
//         this.detailsForm.controls['Balance'].setValue(NewBal);
//       }
//       else {
//         this.detailsForm.controls['Balance'].setValue(Bal);
//       }
//       this.totalDeduct = parseFloat(sum.toFixed(2));
//       var sub = this.totalRate - sum
//       if (!sub) {
//         this.subTotal = this.last
//       } else {
//         this.subTotal = sub.toFixed(2)
//         this.last = this.subTotal
//       }

//     }
//   }


//   Submit() {
//     this.clicked = true
//     var adv = this.detailsForm.get('Adv').value
//     var sup = this.detailsForm.get('Sup').value
//     var sav = this.detailsForm.get('Saving').value
//     // var share = this.detailsForm.get('Share').value
//     var temp
//     var adv_temp: any
//     var sup_temp: any
//     adv_temp = {
//       Name: this.Cname,
//       No: this.Cnum,
//       type: "advance",
//       date: this.currentDate,
//       cutAmount: adv,
//       UId: sessionStorage.getItem("UId")
//     }
//     sup_temp = {
//       Name: this.Cname,
//       No: this.Cnum,
//       type: "supply",
//       date: this.currentDate,
//       cutAmount: sup,
//       UId: sessionStorage.getItem("UId")
//     }

//     temp = {
//       Name: this.Cname,
//       No: this.Cnum,
//       adv: adv,
//       bank: sav,
//       supply: sup,
//       balance: this.detailsForm.get('Balance').value,
//       inv_no: this.invNo,
//       from: this.from,
//       to: this.to,
//       totalmilk: this.totalMilk,
//       morTotalmilk: this.morMilk,
//       eveTotalmilk: this.eveMilk,
//       totalRate: this.totalRate,
//       cutting: this.totalDeduct,
//       subAmount: this.subTotal,
//       mortotalRate: this.morRate,
//       evetotalRate: this.eveRate,
//       UId: sessionStorage.getItem('UId')
//     }
//     this._api.postBill(temp).subscribe((res:any) => {
//       this.err_p = ""
//       this.temp = res
//       this.detailsForm.controls['Adv'].setValue(this.temp.data.adv);
//       this.detailsForm.controls['Sup'].setValue(this.temp.data.supply);
//       this.detailsForm.controls['Saving'].setValue(this.temp.data.bank);
//       this.detailsForm.controls['Balance'].setValue(this.temp.data.balance);
//       this.totalRate = this.temp.data.totalRate
//       this.totalDeduct = this.temp.data.cutting
//       this.subTotal = this.temp.data.subAmount
//       this.CuttingApi(adv_temp, sup_temp)
//       this.exist = true
//       this.OnPrint()
//     }, (err:any) => {
//       this.clicked = false
//       this.exist = false
//       this.err_p = "*ERROR In Saving Data"
//     })
//   }

//   CuttingApi(data1: any, data2: any) {
//     var adv = this.detailsForm.get('Adv').value
//     var sup = this.detailsForm.get('Sup').value
//     if (adv > 0) {
//       this._api.PostSupply(data1).subscribe((res:any) => {

//       }, (err:any) => {
//         console.log(" adv err");
//       })
//     };
//     if (sup > 0) {
//       this._api.PostSupply(data2).subscribe((res:any) => {
//       }, (err:any) => {
//         console.log(" Sup err");
//       })
//     };


//   }

//   OnPrint() {
//     var divContents = document.getElementById("print_section")?.innerHTML
//     var adv = this.detailsForm.get('Adv').value
//     var sup = this.detailsForm.get('Sup').value
//     var sav = this.detailsForm.get('Saving').value
//     var bal = this.detailsForm.get('Balance').value
//     var a: any = window.open('', '', 'height=500, width=900');
//     a.document.write('<html>');
//     a.document.write('<body >');
//     a.document.write(`<h4 style="text-align:center;">${this.name}</h4>`);
//     a.document.write(`<p style="text-align:center;">नाव:${this.Cnum}-${this.Cname}</p>`);
//     a.document.write('<hr/>')
//     a.document.write(divContents)
//     a.document.write('<hr/>')
//     a.document.write(`<p> &nbsp ए.दूध:<strong> ${this.totalMilk}लि.</strong> &nbsp ए.रक्कम:<strong> ${this.totalRate}रु.</strong></p>`)
//     a.document.write(`<p> &nbsp ऍडव्हान्स:<strong>${adv}रु.</strong> &nbsp  &nbsp बँक भरणा:<strong>${sav}रु.</strong></p>`)
//     a.document.write(`<p> &nbsp पशुखाद्य :<strong>${sup}रु.</strong> &nbsp शि.पशुखाद्य:<strong> ${bal}रु.</strong> </p>`)
//     a.document.write(`<p> &nbsp ए. कपात :<strong>${this.totalDeduct}रु.</strong> &nbsp देय रक्कम :<strong> ${this.subTotal}रु.</strong> </p>`)
//     // a.document.write(`<p> </p>`)
//     a.document.write('<hr/>')
//     a.document.write('</body></html>');
//     a.document.close();
//     a.print();
//   }



//   sendDate() {
//     var today = new Date()
//     var myPastDate = new Date(today);
//     if (myPastDate.getDate() == 31) {
//       myPastDate.setDate(today.getDate() - 11)
//     }
//     else {
//       myPastDate.setDate(today.getDate() - 10)
//     }
//     this.Cdate = myPastDate.getDate()
//     this.Cmonth = myPastDate.getMonth() + 1
//     this.Cyear = myPastDate.getFullYear()
//     this.lastDate = formatDate(new Date(myPastDate), 'dd/MM/YYYY', 'en')


//     console.log("this.lastDate",this.lastDate);
    
    
    
//     if (this.Cdate >= 1 && this.Cdate <= 10) {
//       this.from = `${this.Cmonth}/01/${this.Cyear}`
//       this.to = `${this.Cmonth}/11/${this.Cyear}`
//       this.API(this.from, this.to)
//       this.invNo = `${this.Cnum}Bill-01_${this.to}`
//       console.log("1");
//     }


//     else if (this.Cdate >= 11 && this.Cdate <= 20) {
//       this.from = `${this.Cmonth}/11/${this.Cyear}`
//       this.to = `${this.Cmonth}/21/${this.Cyear}`
//       this.API(this.from, this.to)
//       this.invNo = `${this.Cnum}Bill-02_${this.to}`
//       console.log("2");
//     }



//     else if (this.Cdate >= 21 && this.Cdate <= 31) {
//       if (this.Cmonth == 1) {
//         this.from = `${this.Cmonth}/21/${this.Cyear}`
//         this.to = `31/01/${this.Cyear + 1}`
//         this.API(this.from, this.to)
//         console.log("3 if Jan");
//       }
//       else {
//         this.from = `${this.Cmonth}/21/${this.Cyear}`
//         this.to = `/${this.Cmonth + 1}/31${this.Cyear}`
//         this.API(this.from, this.to)
//         console.log("3");
//       }
//       this.invNo = `${this.Cnum}Bill-03_31/${this.Cmonth + 1}/${this.Cyear}`
//     }

//   }
serviceCall(){
  this.Cname = this._serv.Cname
  this.Ctype = this._serv.Ctype
  this.Cnum = this._serv.Cnum   
  this.name = sessionStorage.getItem('Name')
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
console.log("from API",this.Cnum, `${from}`, `${to}`);

  this._api.getBillData(this.Cnum, `${from}`, `${to}`).subscribe(res => {
    this.valid = true
    this.getCurrentBill(res)
console.log(res);

    var temp = {
      No: this.Cnum,
      UId: sessionStorage.getItem("UId")
    }
    this._api.GetBalance(temp).subscribe(result => {
      this.balance = result
      this.detailsForm.controls['Balance'].setValue(this.balance);
      this.findBill()
      this.onload = true
    },
      error => {
        this.onload = true
        this.balance = 0
        this.detailsForm.controls['Balance'].setValue(this.balance);
      })
  }, err => {
    this.err = "नोंदी नाहीत"
    this.onload = true
    this.valid = false
  }
  )
};

findBill() {
  this._api.FindBill(this.invNo, this.Cnum).subscribe(
    res => {
      this.temp = res
      this.detailsForm.controls['Adv'].setValue(this.temp[0].adv);
      this.detailsForm.controls['Sup'].setValue(this.temp[0].supply);
      this.detailsForm.controls['Saving'].setValue(this.temp[0].bank);
      console.log("this.temp[0].balance", this.temp[0].balance);
      this.detailsForm.controls['Balance'].setValue(this.temp[0].balance ? this.temp[0].balance : 0);
      this.totalRate = this.temp[0].totalRate
      this.totalDeduct = this.temp[0].cutting
      this.subTotal = this.temp[0].subAmount
      this.exist = true
      this.onload_1 = true
    }, err => {
      this.exist = false
      this.onload_1 = true
    }
  )
}
pastDate(){
  var today = new Date()
  var myPastDate = new Date(today);
  if (myPastDate.getDate() == 31) {
    myPastDate.setDate(today.getDate() - 11)
  }
  else {
    myPastDate.setDate(today.getDate() - 10)
  }
  this.lastDate = formatDate(new Date(myPastDate), 'MM/dd/YYYY', 'en')
  this.sendDate(this.lastDate)
}









    sendDate(date:any) {
    
      var today = new Date(date)
      this.Cdate = today.getDate()
      this.Cmonth = today.getMonth() + 1
      this.Cyear = today.getFullYear()
  console.log(this.Cdate,this.Cmonth,this.Cyear);
  
      if (this.Cdate >= 1 && this.Cdate <= 10) {
        console.log("1");
        this.from = `${this.Cmonth}/01/${this.Cyear}`
        this.to = `${this.Cmonth}/10/${this.Cyear}`
        this.API(this.from, this.to)
        this.invNo = `${this.Cnum}Bill-01_${this.to}`
      }
      else if (this.Cdate >= 11 && this.Cdate <= 20) {
        console.log("2");
        this.invNo = `${this.Cnum}Bill-02_${this.to}`
        this.from = `${this.Cmonth}/11/${this.Cyear}`
        this.to = `${this.Cmonth}/20/${this.Cyear}`
        this.API(this.from, this.to)
      }
      else if (this.Cdate >= 21 && this.Cdate <= 31) {
        console.log("3");
        this.invNo = `${this.Cnum}Bill-03_${this.to}`
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


getCurrentBill(res: any) {
  this.lastBill =res
  
  var t_Trate = 0
  var Tmilk = 0
  this.morMilk = 0;
  this.morRate = 0;
  this.eveMilk = 0;
  this.eveRate = 0;
  res.forEach((ele: any) => {
      
      t_Trate = t_Trate + parseFloat(ele.t_rate);
      Tmilk = Tmilk + parseFloat(ele.milk);

      if (ele.ehours == "Morning") {
        this.morMilk = this.morMilk + parseFloat(ele.milk);
        this.morRate = this.morRate + parseFloat(ele.t_rate);
      }

      if (ele.ehours == "Evening") {
        this.eveMilk = this.eveMilk + parseFloat(ele.milk);
        this.eveRate = this.eveRate + parseFloat(ele.t_rate);
      }

    
  });
  this.eveMilk = parseFloat(this.eveMilk).toFixed(2)
  this.eveRate = parseFloat(this.eveRate).toFixed(2)
  this.morRate = parseFloat(this.morRate).toFixed(2)
  this.morMilk = parseFloat(this.morMilk).toFixed(2)

  this.totalMilk = Tmilk.toFixed(2)
  var multi:any=sessionStorage.getItem("multi")
  // var share = (this.totalMilk * 0.05).toFixed(2)
  var bankB:any=this.totalMilk * multi
  this.detailsForm.controls['Saving'].setValue(bankB);

  // if(sessionStorage.getItem("UId")=="615c3b6696eff45842bdacd0"){
  //   this.detailsForm.controls['Saving'].setValue(this.totalMilk *2);
  // }else{
  //   this.detailsForm.controls['Saving'].setValue(this.totalMilk);
  // }
  // this.detailsForm.controls['Share'].setValue(share);
  this.totalRate = t_Trate.toFixed(2);
  var sum = parseFloat(bankB)
  this.totalDeduct = parseFloat(sum.toFixed(2));
  var sub = this.totalRate - sum
  this.subTotal = sub.toFixed(2)
  // this.detailsForm.setValue(Saving:)
}


calcu() {
  var adv = this.detailsForm.get('Adv').value
  var sup = this.detailsForm.get('Sup').value
  var sav = this.detailsForm.get('Saving').value
  var Bal = this.balance
  if (adv || sup || sav) {
    var sum = parseFloat(adv) + parseFloat(sup) + parseFloat(sav)
    if (Bal) {
      var NewBal = parseFloat(Bal) - parseFloat(sup)
      this.detailsForm.controls['Balance'].setValue(NewBal);
    }
    else {
      this.detailsForm.controls['Balance'].setValue(Bal);
    }
    this.totalDeduct = parseFloat(sum.toFixed(2));
    var sub = this.totalRate - sum
    if (!sub) {
      this.subTotal = this.last
    } else {
      this.subTotal = sub.toFixed(2)
      this.last = this.subTotal
    }

  }
}


Submit() {
  this.clicked = true
  var adv = this.detailsForm.get('Adv').value
  var sup = this.detailsForm.get('Sup').value
  var sav = this.detailsForm.get('Saving').value
  // var share = this.detailsForm.get('Share').value
  var temp
  var adv_temp: any
  var sup_temp: any
  adv_temp = {
    Name: this.Cname,
    No: this.Cnum,
    type: "advance",
    date: this.currentDate,
    cutAmount: adv,
    UId: sessionStorage.getItem("UId")
  }
  sup_temp = {
    Name: this.Cname,
    No: this.Cnum,
    type: "supply",
    date: this.currentDate,
    cutAmount: sup,
    UId: sessionStorage.getItem("UId")
  }

  temp = {
    Name: this.Cname,
    No: this.Cnum,
    adv: adv,
    bank: sav,
    supply: sup,
    balance: this.detailsForm.get('Balance').value,
    inv_no: this.invNo,
    from: this.from,
    to: this.to,
    totalmilk: this.totalMilk,
    morTotalmilk: this.morMilk,
    eveTotalmilk: this.eveMilk,
    totalRate: this.totalRate,
    cutting: this.totalDeduct,
    subAmount: this.subTotal,
    mortotalRate: this.morRate,
    evetotalRate: this.eveRate,
    UId: sessionStorage.getItem('UId')
  }
  this._api.postBill(temp).subscribe(res => {
    this.err_p = ""
    this.temp = res
    this.detailsForm.controls['Adv'].setValue(this.temp.data.adv);
    this.detailsForm.controls['Sup'].setValue(this.temp.data.supply);
    this.detailsForm.controls['Saving'].setValue(this.temp.data.bank);
    this.detailsForm.controls['Balance'].setValue(this.temp.data.balance);
    this.totalRate = this.temp.data.totalRate
    this.totalDeduct = this.temp.data.cutting
    this.subTotal = this.temp.data.subAmount
    this.CuttingApi(adv_temp, sup_temp)
    this.exist = true
    this.OnPrint()
  }, err => {
    this.clicked = false
    this.exist = false
    this.err_p = "*ERROR In Saving Data"
  })
}

CuttingApi(data1: any, data2: any) {
  var adv = this.detailsForm.get('Adv').value
  var sup = this.detailsForm.get('Sup').value
  if (adv > 0) {
    this._api.PostSupply(data1).subscribe(res => {

    }, err => {
      console.log(" adv err");
    })
  };
  if (sup > 0) {
    this._api.PostSupply(data2).subscribe(res => {
    }, err => {
      console.log(" Sup err");
    })
  };


}

OnPrint() {
  var divContents = document.getElementById("print_section")?.innerHTML
  var adv = this.detailsForm.get('Adv').value
  var sup = this.detailsForm.get('Sup').value
  var sav = this.detailsForm.get('Saving').value
  var bal = this.detailsForm.get('Balance').value
  var a: any = window.open('', '', 'height=500, width=900');
  a.document.write('<html>');
  a.document.write('<body >');
  a.document.write(`<h4 style="text-align:center;">${this.name}</h4>`);
  a.document.write(`<p style="text-align:center;">नाव:${this.Cnum}-${this.Cname}</p>`);
  a.document.write('<hr/>')
  a.document.write(divContents)
  a.document.write('<hr/>')
  a.document.write(`<p> &nbsp ए.दूध:<strong> ${this.totalMilk}लि.</strong> &nbsp ए.रक्कम:<strong> ${this.totalRate}रु.</strong></p>`)
  a.document.write(`<p> &nbsp ऍडव्हान्स:<strong>${adv}रु.</strong> &nbsp  &nbsp बँक भरणा:<strong>${sav}रु.</strong></p>`)
  a.document.write(`<p> &nbsp पशुखाद्य :<strong>${sup}रु.</strong> &nbsp शि.पशुखाद्य:<strong> ${bal}रु.</strong> </p>`)
  a.document.write(`<p> &nbsp ए. कपात :<strong>${this.totalDeduct}रु.</strong> &nbsp देय रक्कम :<strong> ${this.subTotal}रु.</strong> </p>`)
  // a.document.write(`<p> </p>`)
  a.document.write('<hr/>')
  a.document.write('</body></html>');
  a.document.close();
  a.print();
}
}
