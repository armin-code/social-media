import { AuthGuard } from './core/guard/auth.guard';
import { LayoutComponent } from './core/layout/layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const childrenRoutes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/home/home.module').then(
        m => m.HomeModule
      ),
      canActivate: [AuthGuard]
  },


];

export const routes: Routes = [
  {
    path: 'sign-in',
    loadChildren: () =>
      import('./modules/sign-in/sign-in.module').then(m => m.SignInModule)
  },
  {
    path: 'create-account',
    loadChildren: () =>
      import('./modules/create-account/create-account.module').then(m => m.CreateAccountModule)
  },
  {
    path: '',
    component: LayoutComponent,
    children: childrenRoutes
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    relativeLinkResolution: 'corrected',
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
