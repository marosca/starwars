import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PeopleDetailRoutingModule } from './people-detail-routing.module';
import { PeopleDetailsContainer } from './container/people-details.container/people-details.container';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@NgModule({
  declarations: [PeopleDetailsContainer],
  imports: [
    CommonModule,
    PeopleDetailRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
})
export class PeopleDetailModule {}
