import { Injectable } from "@angular/core";
import { Tickets } from "./tickets.model";
import { ResponseModel } from "./response.model";
import { RestDataSource } from "./rest.datasource";

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

    saveTickets(item: Tickets) {
        console.log("working here");
        if (item._id == null || item._id == "") {
            this.dataSource.insertTickets(item).subscribe(p => this.Tickets.push(p));
        }else {
            this.dataSource.updateTickets(item).subscribe(p => {
                this.Tickets.splice(this.Tickets.findIndex(i => i._id == item._id), 1, item);
            });
        }
    }

    deleteTickets(id: string) {
        this.dataSource.deleteTickets(id).subscribe(response => {
            if (response.success) {
                this.Tickets.splice(this.Tickets.findIndex(item => item._id == id),1);
            }else {
                alert(response.message);
            }
        });    
    }

    setToCancelled(id: string){
        // var t = this.getItem(id);
        // t.ticketStatus = 'Cancelled';
        // return this.dataSource.updateTickets(t);
    }
}