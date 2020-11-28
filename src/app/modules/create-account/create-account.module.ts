import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from './../../shared/shared.module';
import { CreateRoutingAccountModule } from './create-account-routing.module';
import { CreateAccountComponent } from './create-account/create-account.component';

@NgModule({
  declarations: [CreateAccountComponent],
  imports: [CommonModule, CreateRoutingAccountModule, SharedModule]
})
export class CreateAccountModule {}
