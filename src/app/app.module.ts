import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import { AppComponent } from './app.component';
import { IndexModule } from './ticketlist/index.module';
import { IndexComponent } from './ticketlist/index.component';
import { PartialsModule } from './ticketlist/partials/partials.module';
import {ListComponent} from "./ticketlist/ticketlist/list.component";
import {ListModule} from "./ticketlist/ticketlist/list.module";
import { AuthModule } from './ticketlist/auth/auth.module';
import { SignInComponent } from './ticketlist/auth/signin.component';
import { SignUpComponent } from "./ticketlist/auth/signup.component";
import { AddEditComponent } from './ticketlist/ticketlist/add_edit.component';
import {AuthGuard} from "./ticketlist/auth/auth.guard";





@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    IndexModule,
    PartialsModule,
    ListModule,
    AuthModule,
    RouterModule.forRoot([
      {path:"", component: IndexComponent},
      {path: "ticketlist/list", component: ListComponent},
      {path: "ticketlist/:mode", component: AddEditComponent, canActivate: [AuthGuard]},
      {path: "ticketlist/:mode/:id", component: AddEditComponent, canActivate: [AuthGuard] },
      {path: "users/signin", component: SignInComponent },
      {path: "users/signup", component: SignUpComponent },
      {path: "**", redirectTo: "" }
    ])
  ],
  providers: [
     AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
