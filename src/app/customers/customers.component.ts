import { Component, ViewChild, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl, SafeUrl,SafeHtml,SafeValue } from '@angular/platform-browser';
import { Pipe, PipeTransform, SecurityContext } from "@angular/core";

const POST_API = 'https://demo.llalwani.com/api/v1/customers';
const GET_API = 'https://demo.llalwani.com/api/v1.0/customers/GetAll';
const GET_PAGED_API = 'https://demo.llalwani.com/api/v1.0/customers/GetPaged?';
const DELETE_API = 'https://demo.llalwani.com/api/v1.0/customers/';
const UPDATE_API = 'https://demo.llalwani.com/api/v1.0/customers/';

const httpOptions = {

headers: new HttpHeaders({ 'Authorization': `Bearer ${localStorage.getItem('token')}`})

};

@Component({
selector: 'app-customers',
templateUrl: './customer.component.html',
styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

getData: any;
display1="none";
info_id = "";

sanitize_phone_no: any;
sanitize_account_number: any;

sanitize_company_name: any;
sanitize_state: any;

sanitize_address: any;
sanitize_zip_code: any;

sanitize_city: any;

order: any;
data: any;

pagination: any = {
    index: 0,
    size: 5,
    page_number: 1   
}

form: any = {
id:null,
account_number: null,
phone_no : null,
company_name : null,
state : null,
address : null,
zip_code : null,
city : null,
search : null,
rowVersion: null
};

content?: string;

constructor(
private userService: UserService,
private http: HttpClient,
public sanitizer: DomSanitizer
) {}

openModal()
{
this.display1="block";
}

onCloseHandled()
{
this.display1="none";
}


firstPage(): void {

//alert("First Page");

this.pagination.index = 0;
this.pagination.page_number = 1;

//alert(this.pagination.index);
//alert(this.pagination.size);
//alert(this.pagination.page_number);

// this.http.get(
// GET_API, httpOptions
// ).subscribe(
// (res) => {

// console.log(res);
// this.getData = res;

// })

this.http.get(
GET_PAGED_API+"StartIndex="+this.pagination.index+"&PageNumber="+this.pagination.page_number+"&PageSize="+this.pagination.size, httpOptions
).subscribe(
(res) => {

console.log(res);
this.getData = res;

})
    

}

nextPage(): void {

this.pagination.index += 5;
this.pagination.page_number += 1;

//alert(this.pagination.index);
//alert(this.pagination.size);

this.http.get(
GET_PAGED_API+"StartIndex="+this.pagination.index+"&PageNumber="+this.pagination.page_number+"&PageSize="+this.pagination.size, httpOptions
).subscribe(
(res) => {

console.log(res);
this.getData = res;

})
        

}

previousPage(): void {

    this.pagination.index -= 5;
    this.pagination.page_number -= 1;
    
  //  alert(this.pagination.index);
  //  alert(this.pagination.size);
    
    this.http.get(
    GET_PAGED_API+"StartIndex="+this.pagination.index+"&PageNumber="+this.pagination.page_number+"&PageSize="+this.pagination.size, httpOptions
    ).subscribe(
    (res) => {
    
    console.log(res);
    this.getData = res;
    
    })
    
}

sortData()
{
 
if(this.order)
{
let newarr = this.getData.sort((a,b) => a.accountNumber - b.accountNumber);
this.getData = newarr;
} 
 else
 {
let newarr = this.getData.sort((a,b) => b.accountNumber - a.accountNumber);
this.getData = newarr;
//alert(newarr);
console.log(newarr);
 }

this.order = !this.order;

}

sortId()
{
 
if(this.order)
{
let newarr = this.getData.sort((a,b) => a.accountNumber - b.accountNumber);
this.getData = newarr;
} 
 else
 {
let newarr = this.getData.sort((a,b) => b.accountNumber - a.accountNumber);
this.getData = newarr;
//alert(newarr);
console.log(newarr);
 }

this.order = !this.order;

}

lastPage(): void {

    alert("Last Page");
}


edit(id : any,account_number : any,companyName : any,address : any,city : any,state : any,zipCode : any,phone : any,rowVersion:any)
{

this.form.id = id;
this.form.account_number = account_number;
this.form.companyName = companyName;
this.form.address = address;
this.form.city = city;
this.form.state = state;
this.form.zipCode = zipCode;
this.form.phone = phone;
this.form.rowVersion = rowVersion;

}

edit_data()
{

const { id,account_number,phone,companyName,state,address,zipCode,city,rowVersion } = this.form;

this.sanitize_account_number = this.sanitizer.sanitize(SecurityContext.HTML,account_number);
this.sanitize_phone_no = this.sanitizer.sanitize(SecurityContext.HTML,phone);
this.sanitize_company_name = this.sanitizer.sanitize(SecurityContext.HTML,companyName);
this.sanitize_state = this.sanitizer.sanitize(SecurityContext.HTML,state);
this.sanitize_address = this.sanitizer.sanitize(SecurityContext.HTML,address);
this.sanitize_zip_code = this.sanitizer.sanitize(SecurityContext.HTML,zipCode);
this.sanitize_city = this.sanitizer.sanitize(SecurityContext.HTML,city);


confirm("Are you Sure ?")
{

this.http.put(
UPDATE_API + `${id}`,
{
accountNumber: this.sanitize_account_number,
companyName: this.sanitize_company_name,
address : this.sanitize_address,
city : this.sanitize_city,
state : this.sanitize_state,
zipCode : this.sanitize_zip_code,
phone : this.sanitize_phone_no,
id : id ,
rowVersion : rowVersion
} , httpOptions
).subscribe(
(data) => {

console.log(data);
this.fetchData();

})

}


}

onSubmit(): void {

var reqHeader = new HttpHeaders({
'Authorization': `Bearer ${localStorage.getItem('token')}`//,
});

const { account_number,phone_no,company_name,state,address,zip_code,city } = this.form;

this.http.post(
POST_API,
{
accountNumber: account_number,
companyName: company_name,
address : address,
city : city,
state : state,
zipCode : zip_code,
phone : phone_no 
} , httpOptions
).subscribe(
(data) => {

console.log(data);
this.fetchData();

})

};

deleteData(info_id : any)
{

confirm("Are you Sure ?")
{

this.http.delete(
DELETE_API + `${info_id}`
, httpOptions
).subscribe(
(res) => {

console.log(res);
//  this.getData = res;
this.fetchData();

})

this.fetchData();

}

}

fetchData()
{

this.http.get(
GET_API, httpOptions
).subscribe(
(res) => {

console.log(res);
this.getData = res;

})

}


ngOnInit(): void {

//this.fetchData();
this.firstPage();

// this.userService.getPublicContent().subscribe(
// (data) => {
// this.content = data;
// },
// (err) => {
// this.content = JSON.parse(err.error).message;
// }
// );


}
}
