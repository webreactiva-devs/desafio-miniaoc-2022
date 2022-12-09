import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Reto1Component } from './reto1/reto1.component';
import { Reto2Component } from './reto2/reto2.component';
import { Reto3Component } from './reto3/reto3.component';

const routes: Routes = [
	{ path: 'reto1', component: Reto1Component },
	{ path: 'reto2', component: Reto2Component },
	{ path: 'reto3', component: Reto3Component },
	{ path: '**', redirectTo: '' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }