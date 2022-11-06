import { Component, ViewChild, OnInit } from "@angular/core";
import { UserService } from "../_services/user.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { DomSanitizer, SafeResourceUrl, SafeUrl,SafeHtml,SafeValue } from '@angular/platform-browser';
import { Pipe, PipeTransform, SecurityContext } from "@angular/core";

// const POST_API = 'https://demo.llalwani.com/api/ServiceItems?api-version=1.0';
// const GET_API = 'https://demo.llalwani.com/api/ServiceItems/GetAll?api-version=1.0';
// const DELETE_API = 'https://demo.llalwani.com/api/ServiceItems/';
// const UPDATE_API = 'https://demo.llalwani.com/api/ServiceItems/';

const POST_API = 'https://demo.llalwani.com/api/Roles?api-version=1.0';
const GET_API = 'https://demo.llalwani.com/api/Roles/GetAll?api-version=1.0';

const DELETE_API = 'https://demo.llalwani.com/api/ServiceItems/';
const UPDATE_API = 'https://demo.llalwani.com/api/ServiceItems/';

const httpOptions = {

headers: new HttpHeaders({ 'Authorization': `Bearer ${localStorage.getItem('token')}`})

};

@Component({
selector: "app-create_roles",
templateUrl: "./create_roles.component.html",
styleUrls: ["./create_roles.component.css"]
})
export class CreateRolesComponent implements OnInit {

getData: any;
display1="none";

sanitize_role_name: any;

form: any = {
id:null,
role_name:null,
search : null
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

edit(id:any,role_name:any)
{

this.form.id = id;
this.form.role_name = role_name;

}

edit_data()
{

const { id,service_item_code,service_item_name,rate,rowVersion } = this.form;

confirm("Are you Sure ?")
{

this.http.put(
UPDATE_API + `${id}`,
{
serviceItemCode: service_item_code,
serviceItemName: service_item_name,
rate : rate,
id : id,
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

const { role_name } = this.form;

this.sanitize_role_name = this.sanitizer.sanitize(SecurityContext.HTML,role_name);

this.http.post(
POST_API,
{
    name: this.sanitize_role_name,
    normalizedName:this.sanitize_role_name
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

this.fetchData();

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
