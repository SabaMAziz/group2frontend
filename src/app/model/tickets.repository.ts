import { Injectable } from "@angular/core";
import { Tickets } from "./tickets.model";
import { Iteration } from './iteration.model'
import { ResponseModel } from "./response.model";
import { RestDataSource } from "./rest.datasource";
import { User } from './user.model';

@Injectable()
export class TicketsRepository {
    private Tickets : Tickets[] = [];

    constructor(private dataSource: RestDataSource) {
        dataSource.getTicketList().subscribe(data => {
            this.Tickets = data;
        });
    }

    getTickets(): Tickets[] {
        return this.Tickets;
    }

    getItem(id: string): Tickets {
        return (this.Tickets.find(item => item._id === id)!);
    }

    saveTickets(item: Tickets, user: string) {        
        console.log("working here");
        console.log(item);
        if (item._id == null || item._id == "") {
            this.dataSource.insertTickets(item).subscribe(p => this.Tickets.push(p));
        }else {            
            this.dataSource.updateTickets(item, user).subscribe(p => {
                this.Tickets.splice(this.Tickets.findIndex(i => i._id == item._id), 1, item);
            });
        }
    }

    // deleteTickets(id: string) {
    //     this.dataSource.deleteTickets(id).subscribe(response => {
    //         if (response.success) {
    //             this.Tickets.splice(this.Tickets.findIndex(item => item._id == id),1);
    //         }else {
    //             alert(response.message);
    //         }
    //     });    
    // }

    setToCancelled(item: Tickets){        
        item.ticketStatus = 'Cancelled';
        this.dataSource.deleteTickets(item);
    }
}