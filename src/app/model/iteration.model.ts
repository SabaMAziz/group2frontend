export class Iteration{

  public username: string;
  public date: Date;
  public comment: string;
  
  constructor(username: string, date: Date, comment: string)
  {
    this.username = username;
    this.date = date;
    this.comment = comment;
  }
}