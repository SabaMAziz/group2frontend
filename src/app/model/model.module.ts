import { NgModule} from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import {TicketsRepository } from "./tickets.repository";
import { RestDataSource } from "./rest.datasource";
import {AuthService} from "./auth.service";

@NgModule({
    imports: [HttpClientModule],
    providers: [
        TicketsRepository,
        RestDataSource,
       AuthService
    ]

    
})

export class ModelModule {}
