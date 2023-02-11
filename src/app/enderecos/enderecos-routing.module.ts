import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EnderecosComponent } from './enderecos/enderecos.component';

const routes: Routes = [{ path: '', component: EnderecosComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnderecosRoutingModule {}
