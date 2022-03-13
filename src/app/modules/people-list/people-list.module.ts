import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PeopleListRoutingModule } from './people-list-routing.module';
import { PeopleListContainer } from './container/people-list.container.component';
import { MatCardModule } from '@angular/material/card';
import { PeopleCardComponent } from './components/people-card/people-card.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [PeopleListContainer, PeopleCardComponent],
  imports: [
    CommonModule,
    PeopleListRoutingModule,
    MatCardModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
  ],
  exports: [PeopleCardComponent],
})
export class PeopleListModule {}
