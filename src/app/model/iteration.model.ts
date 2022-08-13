export class Iteration{

  public username: String;
  public date: Date;
  public comment: String;
  
  constructor(username: String, date: Date, comment: String)
  {
    this.username = username;
    this.date = date;
    this.comment = comment;
  }
}