import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'splash-screen',
    loadChildren: () => import('./splash-screen/splash-screen.module').then( m => m.SplashScreenPageModule)
  },
  {
    path: '',
    redirectTo: 'BillerManualbill',
    pathMatch: 'full'
  },
  {
    path: 'splash-screen',
    loadChildren: () => import('./splash-screen/splash-screen.module').then( m => m.SplashScreenPageModule)
  },
  {
    path: 'login-page',
    loadChildren: () => import('./login-page/login-page.module').then( m => m.LoginPagePageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then( m => m.AdminPageModule)
  },
  {
    path: 'centerweight-auto-dashboard',
    loadChildren: () => import('./CenterWeight/CenterWeightAuto/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'centerweight-auto-weighter',
    loadChildren: () => import('./CenterWeight/CenterWeightAuto/weighter/weighter.module').then( m => m.WeighterPageModule)
  },
  {
    path: 'centerweight-manual-weighter',
    loadChildren: () => import('./CenterWeight/CenterWeightManual/weighter/weighter.module').then( m => m.WeighterPageModule)
  },
  {
    path: 'Merchantweight-manual-dashboard',
    loadChildren: () => import('./MerchantWeight/MerchantWeightManual/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'Merchantweight-manual-bill',
    loadChildren: () => import('./MerchantWeight/MerchantWeightManual/bill/bill.module').then( m => m.BillPageModule)
  },
  {
    path: 'BillerManualbill',
    loadChildren: () => import('./BillerWeight/BillerWeightManual/bill/bill.module').then( m => m.BillPageModule)
  },
  {
    path: 'BillerManualdashboard',
    loadChildren: () => import('./BillerWeight/BillerWeightManual/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
