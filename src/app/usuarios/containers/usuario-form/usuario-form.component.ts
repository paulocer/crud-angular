import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.scss']
})

export class UsuarioFormComponent implements OnInit {

  formUsuario = this.formBuilder.group({
    login: [''],
    nome: [''],
    email: [''],
    perfil: [''],
    senha: [''],
  });

  constructor(private formBuilder: NonNullableFormBuilder,
    private service: UsuariosService,
    private snackBar: MatSnackBar,
    private location: Location) {
    // this.formUsuario 
  }

  ngOnInit(): void {

  }

  onSubmit() {
    this.service.save(this.formUsuario.value)
      .subscribe(result => this.onSuccess(), Error => this.onError());
  }

  onCancel() {
    this.location.back();
  }

  private onSuccess() {
    this.snackBar.open('Usuário cadastrado com sucesso!', '', { duration: 5000 })
    this.onCancel();
  }

  private onError() {
    this.snackBar.open('Erro ao salvar usuário.', '', { duration: 5000 })
  }
}
