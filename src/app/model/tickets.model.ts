import { Iteration } from './iteration.model';

export class Tickets {

    constructor(
           public _id?: string, 
           public name?: String,
           public email?: String,
           public ticketStatus?: String,
           public ticketDescription?: String,
           public recordnum?: Date,
           public ticketPriority?: String,
           public iteration?: Iteration,
           public itArray?: Iteration []
    ) {}        
}
