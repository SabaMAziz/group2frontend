import { Component, Sanitizer } from "@angular/core";
import { NgForm } from "@angular/forms";
import {Router, ActivatedRoute} from "@angular/router";
import { Tickets } from "src/app/model/tickets.model";
import { TicketsRepository } from "src/app/model/tickets.repository";
import { User } from "src/app/model/user.model";
import { Iteration } from 'src/app/model/iteration.model';
import { AuthService } from "src/app/model/auth.service";
import { HttpClient, HttpHandler } from "@angular/common/http";
import { RestDataSource } from "src/app/model/rest.datasource";
import { Injectable } from "@angular/core";

@Component ({
    selector: "add-edit",
    templateUrl: "add_edit.component.html"
})

export class AddEditComponent {

    editing: boolean = false;
    item: Tickets = new Tickets();
    // Ticket: 
    

    constructor(private repository: TicketsRepository,
                    private router: Router,
                    activeRoute: ActivatedRoute,                    
                    private datasource: RestDataSource)
     {
        if (activeRoute.snapshot.params["mode"] == "delete"){
            this.deleteItem(activeRoute.snapshot.params["id"]);
        }
    
        this.editing = activeRoute.snapshot.params["mode"]== "edit";
    
        if(this.editing){
            this.item = repository.getItem(activeRoute.snapshot.params["id"]);
        }
        // else{
        //     this.item.size = new Size();
        // }
    }

    save(form: NgForm){
        console.log("form submitting");                                                
        let auth = new AuthService(this.datasource)        
        let comment = "test comment";
        let user = auth.activeUser;
        console.log(user);
        //NEED TO BE ABLE TO GET USER WHO SUBMITTED FORM
        // console.log(this.item.iteration.comment);
        // console.log(user)
        this.repository.saveTickets(this.item, user, comment);    //not sure about this
        this.router.navigateByUrl("ticketlist/list");
    }
    
    private deleteItem(id: string){
        // this.repository.deleteTickets(id);
        this.router.navigateByUrl("ticketlist/list");
    }
}     