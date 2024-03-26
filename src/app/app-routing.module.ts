import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminModule } from './page/admin/admin.module';
import { EngineerModule } from './page/engineer/engineer.module';
import { FullAdminModule } from './page/full-admin/full-admin.module';
import { LoginComponent } from './page/login/login.component';
import { ProfileComponent } from './page/profile/profile.component';
import { SpecialModule } from './page/special/special.module';
import { StoreModule } from './page/store/store.module';
import { TemplateInputComponent } from './page/template-input/template-input.component';
import { AdminGuard } from './guard/admin.guard';
import { EngineerGuard } from './guard/engineer.guard';
import { SpecialGuard } from './guard/special.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'admin',
    loadChildren: () => AdminModule,
    canActivate: [AdminGuard]
  },
  {
    path: 'engineer',
    loadChildren: () => EngineerModule,
    canActivate: [EngineerGuard]
  },
  {
    path: 'special',
    loadChildren: () => SpecialModule,
    canActivate: [SpecialGuard]
  },
  {
    path: 'store',
    loadChildren: () => StoreModule,
    canActivate: []
  },
  {
    path: 'full-admin',
    loadChildren: () => FullAdminModule,
    canActivate: []
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'foo',
    component:TemplateInputComponent,
    canActivate: []
  },
  {
    path:'profile',
    component:ProfileComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
