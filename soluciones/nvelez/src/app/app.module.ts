import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Reto1Component } from './reto1/reto1.component';
import { AppRoutingModule } from './app-routing.module';
import { Reto2Component } from './reto2/reto2.component';

@NgModule({
  declarations: [
    AppComponent,
    Reto1Component,
    Reto2Component
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
