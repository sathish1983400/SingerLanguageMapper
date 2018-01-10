import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';

import { AppComponent }         from './app.component';
import { SingerService }          from './singer.service';
import { HttpModule }    from '@angular/http';

import { AppRoutingModule }     from './app-routing.module';
import { SingerComponent } from './singer/singer.component';
import { SingerDetailComponent } from './singer-detail/singer-detail.component';
import { CustomAlphabetValidator } from './customAlphabet.validator';


@NgModule({
  imports: [
    HttpModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule

  ],
  declarations: [
    AppComponent,
    SingerComponent,
    SingerDetailComponent,
    CustomAlphabetValidator
  ],
  providers: [ SingerService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
