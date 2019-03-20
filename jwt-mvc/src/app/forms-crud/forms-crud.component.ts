import { Component, OnInit } from '@angular/core';
import { CrudserviceService } from '../crudservice.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-forms-crud',
  templateUrl: './forms-crud.component.html',
  styleUrls: ['./forms-crud.component.css']
})
export class FormsCrudComponent implements OnInit {

  constructor(private serc:CrudserviceService) { }

data=[];
error:any;
obj:object={};
modal:boolean=false;

  ngOnInit() {
    this.serc.get().subscribe(data=>{
      this.data=data;
    })
  }

  post(v){
  this.serc.post(v).subscribe(data=>{
                          this.data=data;
                          alert("success register")},
                           error=>{
                          if(error.status===400){
                            alert("please provide valid input")
                          }
                          if(error.status===500){
                            alert("internal server error")
                          }
  });
  }


  delete(id){
    this.serc.delete(id).subscribe(data=>{
      this.data=data
    })
  }


  update(obj){
    this.obj=obj;
    console.log(obj);
    this.modal=true;
    console.log(this.modal)
   
  }



  put(){
    console.log(this.obj);
    this.modal=false;
    this.serc.put(this.obj).subscribe(data=>{
      this.data=data   ;
      alert("successfully updated")
    } ,
      error=>{
        if(error.status===400){
          alert("update data is not valid")
        }
        if(error.status===500){
          alert("internal server error")
        }
      })
  }

}
