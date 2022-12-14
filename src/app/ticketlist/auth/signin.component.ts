import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../model/auth.service";

@Component({
    templateUrl: "signin.component.html"
})

export class SignInComponent  {
    public title: string ='Sign';
    public username: string;
    public password: string;
    public message: string;
    
   

    constructor(private router: Router,
        private auth: AuthService) { }

    authenticate(form: NgForm) {
        console.log("working here")
        if (form.valid) {
            console.log("still working");
            this.auth.authenticate(this.username, this.password)
                .subscribe(response => {
                    if (response.sucess) {
                        this.router.navigateByUrl(this.auth.redirectUrl || "");
                    }
                    this.message = response.message;
                });
        } else {
            this.message = "Form Data Invalid";
        }
    }
}