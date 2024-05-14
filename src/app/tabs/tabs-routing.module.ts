import { NgModule } from '@angular/core';
import { TabsPage } from './tabs.page';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard'


const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  {
      path: 'tabs',
      component: TabsPage,
      children: [
          {
              path: 'home',
              canActivate: [AuthGuard],
              data: { authGuardPipe: redirectUnauthorizedToLogin },
              loadChildren: () => import('../pages/home/home.module').then(m => m.HomePageModule)
          },
          // Rutas para add, partner, y account
          {
              path: 'add',
              canActivate: [AuthGuard],
              data: { authGuardPipe: redirectUnauthorizedToLogin },
              loadChildren: () => import('../pages/add/add.module').then(m => m.AddPageModule)
          },
          {
              path: 'partner',
              canActivate: [AuthGuard],
              data: { authGuardPipe: redirectUnauthorizedToLogin },
              loadChildren: () => import('../pages/partner/partner.module').then(m => m.PartnerPageModule)
          },
          {
              path: 'account', canActivate: [AuthGuard],
              data: { authGuardPipe: redirectUnauthorizedToLogin },
              loadChildren: () => import('../pages/account/account.module').then(m => m.AccountPageModule)
          },
          {
              path: '',
              redirectTo: '/tabs/home',
              pathMatch: 'full'
          }
      ]
  },
  {
      path: '',
      redirectTo: '/tabs/home',
      pathMatch: 'full'
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
