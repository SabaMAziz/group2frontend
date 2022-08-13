//import { Iteration } from './iteration.model';

export class Tickets {

    constructor(
           public _id?: string, 
           public name?: String,
           public email?: String,
           public ticketStatus?: String,
           public ticketDescription?: String,
           public recordnum?: Date,
           public ticketPriority?: String,
           public comment?: string,
           //  public iteration?: Iteration,
           public itArray?: Iteration []
    ) {}            
}

export class Iteration{

    // public username: string;
    // public date: Date;
    // public comment: string;
    
    constructor(public username?: string, public date?: Date, public comment?: string)
    {
      // this.username = username;
      // this.date = date;
      // this.comment = comment;
    }
}
