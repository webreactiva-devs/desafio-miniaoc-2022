import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Reto1Component } from './reto1/reto1.component';

const routes: Routes = [
	{ path: 'reto1', component: Reto1Component },
	{ path: '**', redirectTo: '' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }