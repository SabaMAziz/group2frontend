import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Tickets } from "../../model/tickets.model";
import { TicketsRepository } from "../../model/tickets.repository";



@Component({
    selector: "ticketlist-ticket",
    templateUrl: "list.component.html"
})


export class ListComponent {

    title = 'Tickets DashBoard';

    constructor(private repository: TicketsRepository,
        private router: Router)
        { }

        get ticket():Tickets[] {
            return this.repository.getTickets();
        }

        deleteMethod(id: string) {
            if(confirm('Do you want to delete this ticket?')) {
                this.repository.setToCancelled(id);
                this.router.navigateByUrl("ticketlist/list");
            }
        }
}