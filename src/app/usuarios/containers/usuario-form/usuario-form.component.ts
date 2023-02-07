import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from '../../model/usuario';

import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.scss']
})

export class UsuarioFormComponent implements OnInit {

  formUsuario = this.formBuilder.group({
    _id: [''],
    login: [''],
    nome: [''],
    email: [''],
    perfil: [''],
    senha: [''],
  });

  constructor(private formBuilder: NonNullableFormBuilder,
    private service: UsuariosService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute) {
    // this.formUsuario 
  }

  ngOnInit(): void {
    const usuario: Usuario = this.route.snapshot.data['usuario'];
    this.formUsuario.setValue({
      _id: usuario._id,
      login: usuario.login,
      nome: usuario.nome,
      email: usuario.email,
      perfil: usuario.perfil,
      senha: usuario.senha
    });
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
