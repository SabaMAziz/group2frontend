import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/model/auth.service';
import { Tickets } from '../../model/tickets.model';
import { TicketsRepository } from '../../model/tickets.repository';

@Component({
  selector: 'ticketlist-ticket',
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.css'],
})
export class ListComponent implements OnInit {
  public title = 'Tickets DashBoard';
  public static cancelledString = 'cancelled';
  private priorities: { [key: string]: number } = {
    urgent: 1,
    'very high': 2,
    high: 3,
    medium: 4,
    low: 5,
  };

  public orderList: any[];

  constructor(
    private repository: TicketsRepository,
    private router: Router,
    private readonly authService: AuthService
  ) {}

  public ngOnInit(): void {
    if (!this.authService.authenticated) {
      this.router.navigateByUrl('/users/signin');
    }
    //
  }

  get tickets(): Tickets[] {
    const currentTickets = this.repository.getTickets();
    const getCancelled: Tickets[] = currentTickets.filter(
      (item) =>
        item.ticketStatus.toLowerCase() === ListComponent.cancelledString
    );
    const getNotCancelled: Tickets[] = currentTickets.filter(
      (item) =>
        item.ticketStatus.toLocaleLowerCase() !== ListComponent.cancelledString
    );

    const preordered: Tickets[] = [];

    Object.keys(this.priorities).forEach((item) => {
      const tempArr = getNotCancelled.filter(
        (ticket) => ticket.ticketPriority.toLowerCase() === item
      );
      preordered.push(...tempArr);
    });

    return [...preordered, ...getCancelled];
  }

  lowercasePriority(priorityString: any): string {
    return priorityString.toLowerCase().toString();
  }

  getClassFromPriority(priorityStr: string) {
    try {
      const priority = this.priorities[priorityStr];
      switch (priority) {
        case 1: //urgent
          return 'bg-primary';
        case 2: //very high
          return 'bg-danger';
        case 3: // high
          return 'bg-warning';
        case 4: //medium
          return 'bg-info';
        case 5:
          return 'bg-light';
        default:
          return 'bg-dark';
      }
    } catch (e) {
      console.error({ e });
      return 'bg-dark';
    }
  }
        get ticket():Tickets[] {
            return this.repository.getTickets().filter(item => this.showComplete || item.ticketStatus !== "Cancelled" );
        }

  deleteMethod(id: string) {
    if (confirm('Do you want to delete this ticket?')) {
      this.repository.setToCancelled(id);
      this.router.navigateByUrl('ticketlist/list');
    }
  }
}
