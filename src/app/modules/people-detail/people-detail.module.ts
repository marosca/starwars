import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PeopleDetailRoutingModule } from './people-detail-routing.module';
import { PeopleDetailsContainer } from './container/people-details.container/people-details.container';

@NgModule({
  declarations: [PeopleDetailsContainer],
  imports: [CommonModule, PeopleDetailRoutingModule],
})
export class PeopleDetailModule {}
