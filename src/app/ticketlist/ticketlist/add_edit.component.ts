import { Component, OnInit, Sanitizer } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/model/auth.service';
import { Tickets } from 'src/app/model/tickets.model';
import { TicketsRepository } from 'src/app/model/tickets.repository';

@Component({
  selector: 'add-edit',
  templateUrl: 'add_edit.component.html',
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
