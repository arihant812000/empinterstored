import { Component } from '@angular/core';
import {ApicallService} from './apicall.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'employeeinterface';
  display="none";
  EmployeesDisplay="block";
  displayEmployeeInfo="none";
  page = 1;
  pageSize = 7;
  select=""
  employeesdata:any;
employeeSearched:any;
  collectionSize =0;
  employees:any;
  displayDetails={}
  empdata={}
  constructor(private apicall:ApicallService){
    this.getEmployee()
  }
 
  
  
  onsubmit=(value)=>{
    
    this.display="none"
    this.getEmployee();
    this.displayEmployeeInfo="none"
  
  }

  addEmployee=()=>{
    this.display="block"
    this.EmployeesDisplay="none"
    this.displayEmployeeInfo="none"
  }
  getEmployee=()=>{
    this.EmployeesDisplay="block"
    this.display="none"
    this.displayEmployeeInfo="none"
this.apicall.getData().subscribe(data=>{

this.employees=data
this.collectionSize=this.employees.length
this.employeeSearched = this.employees
      .map((item,index)=>({
        id:index+1,
        ...item
      }))
this.refreshEmployee()
this.select=""
})
  }
  refreshEmployee() {
    
      this.employeesdata=this.employeeSearched.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);

  }
  delete=(id)=>{
    
    this.apicall.deleteEmployee(id).subscribe(res=>{
      window.alert(res)
      this.getEmployee()
    })
  }
  editinfo=(employee)=>{
    console.log(employee)
 delete employee.id
  employee.empaddr.forEach(element => {
   delete element.Id
   delete element.Empid
   delete element.Employee
 });
 console.log(employee)
   this.empdata=employee
    console.log(this.empdata)
    this.empdata=employee
    this.display="block"
    this.EmployeesDisplay="none"
    this.displayEmployeeInfo="none"
   
  }
  getDetails=(data)=>{
   
    this.displayDetails=data
    this.display="none"
    this.EmployeesDisplay="none"
    this.displayEmployeeInfo="block"
  }
  searchEmployee=(item)=>{
    var data=[];

this.employeeSearched.forEach(element => {
  if((element.First_Name.toLowerCase()).includes(item.toLowerCase())||(element.Last_Name.toLowerCase()).includes(item.toLowerCase())||(element.Phone_No).includes(item)||(element.Email.toLowerCase()).includes(item.toLowerCase())){
    
    data.push(element)
  }
  
});
this.employeesdata=data;
  }
  sort=(data)=>{
console.log(data)
if(data=="name"){
  this.employeesdata= this.employeeSearched.sort((a, b) => {
    let fa = a.First_Name.toLowerCase(),
        fb = b.First_Name.toLowerCase();

    if (fa < fb) {
        return -1;
    }
    if (fa > fb) {
        return 1;
    }
    return 0;
});
}
else if(data=="phone"){
 this.employeesdata= this.employeeSearched
 .sort((a, b) => {
    let fa = a.Phone_No.toLowerCase(),
        fb = b.Phone_No.toLowerCase();

    if (fa < fb) {
        return -1;
    }
    if (fa > fb) {
        return 1;
    }
    return 0;
});
}
else if(data=="email"){
  this.employeesdata= this.employeeSearched.sort((a, b) => {
    let fa = a.Email.toLowerCase(),
        fb = b.Email.toLowerCase();

    if (fa < fb) {
        return -1;
    }
    if (fa > fb) {
        return 1;
    }
    return 0;
});
}
else{
  this.employeesdata= this.employeeSearched.sort((a, b) => {
    return a.id - b.id;
});
}
this.refreshEmployee()
  }
}

