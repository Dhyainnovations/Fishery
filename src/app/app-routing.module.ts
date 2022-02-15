import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'splash-screen',
    loadChildren: () => import('./splash-screen/splash-screen.module').then( m => m.SplashScreenPageModule)
  },
  {
    path: '',
    redirectTo: 'splash-screen',
    pathMatch: 'full'
  },
  {
    path: 'splash-screen',
    loadChildren: () => import('./splash-screen/splash-screen.module').then( m => m.SplashScreenPageModule)
  },
  {
    path: 'loginpage',
    loadChildren: () => import('./login-page/login-page.module').then( m => m.LoginPagePageModule)
  },
 
  {
    path: 'admin-dashboard',
    loadChildren: () => import('./admin/admindashboard/admindashboard.module').then( m => m.AdmindashboardPageModule)
  },
  {
    path: 'admin-usercreation',
    loadChildren: () => import('./admin/user-creation/user-creation.module').then( m => m.UserCreationPageModule)
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
  {
    path: 'BillerAutodashboard',
    loadChildren: () => import('./BillerWeight/BillerWeightAuto/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'BillerAutoweighter',
    loadChildren: () => import('./BillerWeight/BillerWeightAuto/weighter/weighter.module').then( m => m.WeighterPageModule)
  },
  {
    path: 'BillerAutobill',
    loadChildren: () => import('./BillerWeight/BillerWeightAuto/bill/bill.module').then( m => m.BillPageModule)
  },
  {
    path: 'MerchantWeightAutodashboard',
    loadChildren: () => import('./MerchantWeight/MerchantWeightAuto/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'MerchantWeightAutoweighter',
    loadChildren: () => import('./MerchantWeight/MerchantWeightAuto/weighter/weighter.module').then( m => m.WeighterPageModule)
  },
  {
    path: 'MerchantWeightAutobill',
    loadChildren: () => import('./MerchantWeight/MerchantWeightAuto/bill/bill.module').then( m => m.BillPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'center-weight-manual-record',
    loadChildren: () => import('./CenterWeight/CenterWeightManual/center-weight-manual-record/center-weight-manual-record.module').then( m => m.CenterWeightManualRecordPageModule)
  },
  {
    path: 'biller-weight-manual-record',
    loadChildren: () => import('./BillerWeight/BillerWeightManual/biller-weight-manual-record/biller-weight-manual-record.module').then( m => m.BillerWeightManualRecordPageModule)
  },
  {
    path: 'center-weight-auto-record',
    loadChildren: () => import('./CenterWeight/CenterWeightAuto/center-weight-auto-record/center-weight-auto-record.module').then( m => m.CenterWeightAutoRecordPageModule)
  },
  {
    path: 'biller-auto-record',
    loadChildren: () => import('./BillerWeight/BillerWeightAuto/biller-auto-record/biller-auto-record.module').then( m => m.BillerAutoRecordPageModule)
  },
  {
    path: 'cwm-date-based-record',
    loadChildren: () => import('./CenterWeight/CenterWeightManual/cwm-date-based-record/cwm-date-based-record.module').then( m => m.CWMDateBasedRecordPageModule)
  },
  {
    path: 'cwa-date-based-record',
    loadChildren: () => import('./CenterWeight/CenterWeightAuto/cwa-date-based-record/cwa-date-based-record.module').then( m => m.CWADateBasedRecordPageModule)
  },
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
