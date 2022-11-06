import { Pipe, PipeTransform, SecurityContext } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { AuthService } from "../_services/auth.service";
import { TokenStorageService } from "../_services/token-storage.service";
import { Router, ActivatedRoute } from "@angular/router";
import { DomSanitizer, SafeResourceUrl, SafeUrl,SafeHtml,SafeValue } from '@angular/platform-browser';

@Component({
selector: 'app-login',
templateUrl: './login.component.html'    
})
export class LoginComponent implements OnInit {

public url: SafeValue | undefined;

sanitize_email: any;
sanitize_password: any;
form : any = {
email: null,
password: null
};
isLoggedIn = false;
isLoginFailed = false;
errorMessage = "";
roles: string[] = [];
var1: string[] = [];
var2: string[] = [];

login_email: any;

constructor(
private route: ActivatedRoute,
private router: Router,
private authService: AuthService,
private tokenStorage: TokenStorageService,
public sanitizer: DomSanitizer
) {}

ngOnInit(): void {
if (this.tokenStorage.getToken()) {
this.isLoggedIn = true;
this.login_email = localStorage.getItem("login_email");

//     this.roles = this.tokenStorage.getUser().roles;
}
}


onSubmit(): void {

const { email, password } = this.form;

this.sanitize_email = this.sanitizer.sanitize(SecurityContext.HTML,email);
this.sanitize_password = this.sanitizer.sanitize(SecurityContext.HTML,password);

//this.authService.login(email, password).subscribe(
this.authService.login(this.sanitize_email, this.sanitize_password).subscribe(

(data) => {

this.tokenStorage.saveToken(data.token);
this.tokenStorage.saveUser(data);

localStorage.setItem('token',data.token);
localStorage.setItem('user_id',data.userId);
localStorage.setItem('login_email',email);

localStorage.setItem('currentUser', email);
localStorage.setItem('userID',data.userId);

localStorage.setItem('isLoggedin', 'true');

this.isLoginFailed = false;
this.isLoggedIn = true;
this.roles = this.tokenStorage.getUser().roles;
this.login_email = localStorage.getItem("login_email");
//  this.reloadPage();

//    this.router.navigate(["/login"]);

//window.location.reload();
//
this.router.navigate(["/dashboard/dashboard1"]);


},

(err) => {
this.errorMessage = err.error.message;
this.isLoginFailed = true;
}
);
}

reloadPage(): void {

this.login_email = localStorage.getItem("login_email");
window.location.reload();

}
}
