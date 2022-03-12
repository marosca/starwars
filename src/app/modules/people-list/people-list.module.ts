import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PeopleListRoutingModule } from './people-list-routing.module';
import { PeopleListContainer } from './container/people-list.container.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [PeopleListContainer],
  imports: [
    CommonModule,
    PeopleListRoutingModule,
    MatCardModule,
    MatPaginatorModule,
  ],
})
export class PeopleListModule {}
