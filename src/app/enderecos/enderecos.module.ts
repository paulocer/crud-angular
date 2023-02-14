import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AppMaterialModule } from './../shared/app-material/app-material.module';
import { EnderecosRoutingModule } from './enderecos-routing.module';
import { EnderecosComponent } from './containers/enderecos/enderecos.component';
import { EnderecoFormComponent } from './containers/endereco-form/endereco-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EnderecosListComponent } from './components/enderecos-list/enderecos-list.component';

@NgModule({
  declarations: [
    EnderecosComponent,
    EnderecoFormComponent,
    EnderecosListComponent,
  ],
  imports: [
    CommonModule,
    EnderecosRoutingModule,
    AppMaterialModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class EnderecosModule {}
