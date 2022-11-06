import { Component, AfterViewInit, OnInit } from '@angular/core';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ROUTES } from './menu-items';
import { RouteInfo } from "./sidebar.metadata";
import { Router, ActivatedRoute } from "@angular/router";
import { Http,Response,Headers } from '@angular/http';

declare var $: any;
@Component({
selector: 'ap-sidebar',
templateUrl: './sidebar.component.html'

})
export class SidebarComponent implements OnInit {


showMenu: string = '';
showSubMenu: string = '';
user_id = '';
user_name = '';
data = [];
branch_name = '';
picture = '';
activeuser = "";
mainmenu = "";
submenus = "";
menu_id = "";
role_id = "";

public sidebarnavItems: any[];
//this is for the open close
addExpandClass(element: any) {
if (element === this.showMenu) {
this.showMenu = '0';

} else {
this.showMenu = element; 
}
}
addActiveClass(element: any) {
if (element === this.showSubMenu) {
this.showSubMenu = '0';

} else {
this.showSubMenu = element; 
}
}

constructor(private modalService: NgbModal, private router: Router,
private route: ActivatedRoute,private http:Http) {

} 
// End open close

ngOnInit(): void {

this.user_id = localStorage.getItem('user_id');    

this.user_name =  localStorage.getItem('currentUser');    
//alert(this.user_id);  


}

onLoggedout(){
localStorage.setItem('isLoggedin','false');
localStorage.setItem('currentUser','');
localStorage.setItem('userID','');

}

}
