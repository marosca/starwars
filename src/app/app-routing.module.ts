import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { paths } from './app-routing.paths';

const routes: Routes = [
  {
    path: paths.home,
    loadChildren: () =>
      import('./modules/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: paths.peopleList,
    loadChildren: () =>
      import('./modules/people-list/people-list.module').then(
        (m) => m.PeopleListModule
      ),
  },
  {
    path: paths.peopleDetail + '/:id',
    loadChildren: () =>
      import('./modules/people-detail/people-detail.module').then(
        (m) => m.PeopleDetailModule
      ),
  },
  {
    path: paths.peopleDetail + '/:id/',
    redirectTo: paths.peopleDetail + '/:id',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
