
import { Component, Sanitizer } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
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
export class AddEditComponent implements OnInit {
  editing: boolean = false;
  item: Tickets = new Tickets();

  constructor(
    private repository: TicketsRepository,
    private router: Router,
    public activeRoute: ActivatedRoute,
    private readonly authService: AuthService
  ) {
    // else{
    //     this.item.size = new Size();
    // }
  }


  public ngOnInit(): void {
    debugger;
    if (!this.authService.authenticated) {
      this.router.navigateByUrl('/users/signin');
    }

    switch (this.activeRoute.snapshot.params['mode']) {
      case 'edit':
        this.item = this.repository.getItem(
          this.activeRoute.snapshot.params['id']
        );
        this.editing = true;
        break;
      case 'delete':
        this.deleteItem(this.activeRoute.snapshot.params['id']);
        break;
      default:
        console.warn(this.activeRoute.snapshot.params['mode']);
        break;

    editing: boolean = false;
    item: Tickets = new Tickets();    
    iteration: Iteration = {        
            username: this.auth.username,
            date: new Date,
            comment: ""        
    }    
    

    constructor(private repository: TicketsRepository,
                    private router: Router,
                    activeRoute: ActivatedRoute,                    
                    private datasource: RestDataSource,
                    private auth: AuthService)     {
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
        let user = this.iteration.username;
        console.log(user);        
        this.repository.saveTickets(this.item, this.auth.username);   
        this.router.navigateByUrl("ticketlist/list");
    }
    
    private deleteItem(id: string){
        // this.repository.deleteTickets(id);
        this.router.navigateByUrl("ticketlist/list");

    }

    console.log({ item: this.item });
  }

  save(form: NgForm) {
    console.log('form submitting');
    this.repository.saveTickets(this.item);
    this.router.navigateByUrl('ticketlist/list');
  }

  private deleteItem(id: string) {
    this.repository.deleteTickets(id);
    this.router.navigateByUrl('ticketlist/list');
  }
}
