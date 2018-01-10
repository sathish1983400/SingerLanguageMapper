import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingerComponent } from './singer/singer.component';
import { SingerDetailComponent } from './singer-detail/singer-detail.component';


const routes: Routes = [
  { path: 'singerdetail/:title', component: SingerDetailComponent },
  { path: 'singer', component: SingerComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
