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
           public itArray?: Iteration []
    ) {}            
}

export class Iteration{

    
    constructor(public username?: string, public date?: Date, public comment?: string)
    {
      
    }
}
