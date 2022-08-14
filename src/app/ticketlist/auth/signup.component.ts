import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/model/auth.service";
import { User } from "src/app/model/user.model"; 

@Component({
    templateUrl: "signup.component.html"
})

export class SignUpComponent {

    public user: User = new User();
    public confirmPassowrd: string;
    public message: string;

    constructor(private router: Router,
        private auth: AuthService) { }

    signup(form: NgForm) {
        if (form.valid) {

            //see if passwords match
            if(this.user.password != ""){

                this.auth.signupUser(this.user)
                    .subscribe(response => {
                        console.log(response);
                        
                        if (response.success) {
                            alert(response.message);
                            this.router.navigateByUrl("/users/signin");
                        }

                        // error message

                        this.message = response.message; 
                    });
            } else {
                this.message = "Passwords do not match";    
            }
        } else {
            this.message = "Form Data Invalid";
        }
    }
}