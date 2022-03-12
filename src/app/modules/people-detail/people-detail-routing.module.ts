import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeopleDetailsContainer } from './container/people-details.container/people-details.container';

const routes: Routes = [
  {
    path: '**',
    component: PeopleDetailsContainer,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PeopleDetailRoutingModule {}
