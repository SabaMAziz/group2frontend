import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of} from "rxjs";
import { map, catchError} from "rxjs/operators";
import { HttpHeaders } from '@angular/common/http';
import { Tickets} from './tickets.model';
import { User } from "./user.model";
import { ResponseModel } from "./response.model";
import { environment } from "src/environments/environment";


// const PROTOCOL = "http";
// const PORT = 3000;

@Injectable()
export class RestDataSource {

    baseUrl: string;
    auth_token: string;

    constructor(private http: HttpClient) {
        this.baseUrl = environment.apiurl;
        console.log(this.baseUrl);
    }

    getTicketList(): Observable<Tickets[]> {
        return this.http.get<Tickets[]>(this.baseUrl + "ticketlist/list");
    }

    insertTickets(item: Tickets): Observable<Tickets> {
        return this.http.post<Tickets>(
                this.baseUrl + "ticketlist/add",
                item, 
                this.getOptions()
            ).pipe(map(response => {
                return response;
            }),
            catchError(error => {
                console.log(error.error);
                return (error.error);
            }));
    }

    updateTickets(item: Tickets): Observable<ResponseModel> {
        return this.http.put<ResponseModel>(`${this.baseUrl} ticketlist/edit/${item._id})`,
        item, this.getOptions()).pipe(map(response => {
            return response;
        }),
        catchError(error => { return of(error.error)}));
        
       
    }

    deleteTickets(id: string): Observable<ResponseModel> {
        return this.http.delete<ResponseModel>(`${this.baseUrl}ticketlist/delete/${id}`,
        this.getOptions()).pipe(map(response => {
            return response;
        }),
        catchError(error => {return of(error.error)}));
    }

    authenticate(user: string, pass: string): Observable<ResponseModel> {
        console.log('User'+user+'pass'+pass);
        return this.http.post<any>(this.baseUrl + "users/signin",
         {
            username: user,
            password: pass

        }).pipe
        (map(response => {
            this.auth_token = response.sucess ? response.token : null;
            return response;
        }),
         catchError(error => { return of(error.error)}));
            //console.log(error);
           
    }

    signupUser(user: User): Observable<ResponseModel> {
        return this.http.post<ResponseModel>(this.baseUrl + "users/signup", user).pipe(map(response => {
            return response;
        }))
    }
    
    private getOptions() {
        return {
            headers: new HttpHeaders({
                "Authorization": `Bearer ${this.auth_token}`
            })
        }
    }
}