import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EnderecoFormComponent } from './containers/endereco-form/endereco-form.component';
import { EnderecosComponent } from './containers/enderecos/enderecos.component';
import { EnderecoResolver } from './guards/endereco.resolver';

const routes: Routes = [
  { path: '', component: EnderecosComponent },
  {
    path: 'new',
    component: EnderecoFormComponent,
    resolve: { endereco: EnderecoResolver },
  },
  {
    path: 'edit/:id',
    component: EnderecoFormComponent,
    resolve: { endereco: EnderecoResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnderecosRoutingModule {}
