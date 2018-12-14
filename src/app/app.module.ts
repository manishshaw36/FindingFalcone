import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { MyHttpService } from './my-http.service';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import * as $ from 'jquery';

import { ResultComponent } from './result/result.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { HomeComponent } from './home/home.component';
@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    ResultComponent,
    NotfoundComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'index',
        component: IndexComponent
      },
      {
        path: 'find_falcone',
        component: ResultComponent, canActivate: [MyHttpService]
      },
      {
        path: '**',
        component: NotfoundComponent
      },
    ])
  ],
  providers: [MyHttpService, ResultComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
