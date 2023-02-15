import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  // Fallback when no prior route is matched
  { path: 'register', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', redirectTo: '/adminhome', pathMatch: 'full' },

  { path: 'addbus', redirectTo: '/buslist', pathMatch: 'full' },
  { path: 'buslist', redirectTo: '', pathMatch: 'full' },
  // { path: 'updatebus', redirectTo: '/buslist', pathMatch: 'full' },
  { path: 'addbusroute', redirectTo: '/busroutelist', pathMatch: 'full' },
  { path: 'busroutelist', redirectTo: '', pathMatch: 'full' },
  { path: 'updatebusroute', redirectTo: '/busroutelist', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
