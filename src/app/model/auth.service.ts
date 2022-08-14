import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { RestDataSource } from "./rest.datasource";
import { User } from "./user.model";
import { ResponseModel } from "./response.model";

@Injectable()
<<<<<<< Updated upstream
    export class AuthService {

    public username: string;
    private _redirectUrl: string;    

    constructor(private datasource: RestDataSource) { }

    authenticate(username: string, password: string): Observable<ResponseModel> {
        return this.datasource.authenticate(username, password)
            .pipe(map(response => {
                if(response.sucess)
                {
                    this.username = username;
                }
                return response;
            }));
    }
=======
export class AuthService {
  public username: string;
  private _redirectUrl: string;

  constructor(private datasource: RestDataSource) {}

  authenticate(username: string, password: string): Observable<ResponseModel> {
    return this.datasource.authenticate(username, password).pipe(
      map((response) => {
        if (response) {
          this.username = username;
        }
        return response;
      })
    );
  }
>>>>>>> Stashed changes

  signupUser(user: User): Observable<ResponseModel> {
    return this.datasource.signupUser(user);
  }

    get authenticated(): boolean {
        return this.datasource.auth_token != null;
    }

    clear() {
        this.username = null;
        this.datasource.auth_token = null;
    }

  get redirectUrl(): string {
    let result = this._redirectUrl;
    this._redirectUrl = null;
    return result;
  }

<<<<<<< Updated upstream
    set redirectUrl(url: string){
        this._redirectUrl = url;
    }

    get activeUser()
    {        
        return this.username;
    }
}
=======
  set redirectUrl(url: string) {
    this._redirectUrl = url;
  }
}
>>>>>>> Stashed changes
