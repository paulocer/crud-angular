import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppMaterialModule } from './app-material/app-material.module';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { PerfilPipe } from './pipes/perfil.pipe';



@NgModule({
  declarations: [
    ErrorDialogComponent,
    PerfilPipe
  ],
  imports: [
    CommonModule,
    AppMaterialModule
  ],
  exports: [
    ErrorDialogComponent,
    PerfilPipe
  ]
})
export class SharedModule { }
