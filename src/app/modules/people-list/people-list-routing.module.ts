import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeopleListContainer } from './container/people-list.container.component';

const routes: Routes = [
  {
    path: '',
    component: PeopleListContainer,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  entryComponents: [],
})
export class PeopleListRoutingModule {}
