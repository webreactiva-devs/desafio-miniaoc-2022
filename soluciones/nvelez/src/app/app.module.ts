import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Reto1Component } from './reto1/reto1.component';
import { AppRoutingModule } from './app-routing.module';
import { Reto2Component } from './reto2/reto2.component';
import { Reto2Interceptor } from './reto2/reto2.interceptor';
import { Reto3Component } from './reto3/reto3.component';
import { Reto3Interceptor } from './reto3/reto3.interceptor';
import { LinkPipe } from './services/link.pipe';
import { RemoveLinkPipe } from './services/remove-link.pipe';

@NgModule({
  declarations: [
    AppComponent,
    Reto1Component,
    Reto2Component,
    Reto3Component,
    LinkPipe,
    RemoveLinkPipe
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: Reto2Interceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: Reto3Interceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
