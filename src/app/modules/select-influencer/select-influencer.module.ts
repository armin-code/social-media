import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from './../../shared/shared.module';
import { SelectInfluencerRoutingModule } from './select-influencer-routing.module';
import { SelectInfluencerComponent } from './select-influencer/select-influencer.component';

@NgModule({
  declarations: [SelectInfluencerComponent],
  imports: [CommonModule, SelectInfluencerRoutingModule, SharedModule]
})
export class SelectInfluencerModule {}
