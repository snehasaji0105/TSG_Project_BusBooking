import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddBusComponent } from '@app/addbus/addbus.component';
import { AddBusRouteComponent } from '@app/addbusroute/addbusroute.component';
import { AdminhomeComponent } from '@app/adminhome/adminhome.component';
import { BuslistComponent } from '@app/buslist/buslist.component';
import { BusroutelistComponent } from '@app/busroutelist/busroutelist.component';
import { HomeComponent } from '@app/home/home.component';
import { RegisterComponent } from '@app/auth/register/register.component';
import { UpdatebusComponent } from '@app/updatebus/updatebus.component';
import { UpdatebusrouteComponent } from '@app/updatebusroute/updatebusroute.component';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { LoginComponent } from './login/login.component';
import { AuthenticationGuard } from './authentication.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent, data: { title: marker('Login') } },
  { path: 'register', component: RegisterComponent, data: { title: marker('Register') } },
  { path: 'adminhome', component: AdminhomeComponent,canActivate:[AuthenticationGuard], data: { title: marker('AdminHome') } },
  { path: 'addbus', component: AddBusComponent,canActivate:[AuthenticationGuard], data: { title: marker('AddBus') } },
  { path: 'buslist', component: BuslistComponent, data: { title: marker('BusList') } },
  { path: 'updatebus', component: UpdatebusComponent,canActivate:[AuthenticationGuard],  data: { title: marker('UpdateBus') } },
  { path: 'addbusroute', component: AddBusRouteComponent,canActivate:[AuthenticationGuard],  data: { title: marker('AddBusRoute') } },
  { path: 'busroutelist', component: BusroutelistComponent,  data: { title: marker('BusRouteList') } },
  { path: 'updatebusroute', component: UpdatebusrouteComponent,canActivate:[AuthenticationGuard],  data: { title: marker('UpdateBusRoute') } },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AuthRoutingModule {}
