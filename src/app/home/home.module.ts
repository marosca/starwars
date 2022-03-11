import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeContainer } from './container/home-container/home.container';

@NgModule({
  declarations: [HomeContainer],
  imports: [CommonModule, HomeRoutingModule],
})
export class HomeModule {}
