import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppMaterialModule } from './../shared/app-material/app-material.module';
import { SharedModule } from './../shared/shared.module';
import { EnderecosRoutingModule } from './enderecos-routing.module';
import { EnderecosComponent } from './enderecos/enderecos.component';

@NgModule({
  declarations: [EnderecosComponent],
  imports: [
    CommonModule,
    EnderecosRoutingModule,
    AppMaterialModule,
    SharedModule,
  ],
})
export class EnderecosModule {}
