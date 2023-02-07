import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from '../../model/usuario';

import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.scss'],
})
export class UsuarioFormComponent implements OnInit {
  hide = true;
  formUsuario = this.formBuilder.group({
    _id: [''],
    login: [
      '',
      [Validators.required, Validators.minLength(5), Validators.maxLength(15)],
    ],
    nome: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(60)],
    ],
    email: ['', [Validators.required, Validators.email]],
    perfil: ['', [Validators.required]],
    senha: [
      '',
      [Validators.required, Validators.minLength(8), Validators.maxLength(16)],
    ],
  });

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: UsuariosService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute
  ) {
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
      senha: usuario.senha,
    });
  }

  onSubmit() {
    this.service.save(this.formUsuario.value).subscribe(
      (result) => this.onSuccess(),
      (Error) => this.onError()
    );
  }

  onCancel() {
    this.location.back();
  }

  private onSuccess() {
    this.snackBar.open('Usuário cadastrado com sucesso!', '', {
      duration: 5000,
    });
    this.onCancel();
  }

  private onError() {
    this.snackBar.open('Erro ao salvar usuário.', '', { duration: 5000 });
  }

  public getErrorMessage(fieldName: string) {
    const field = this.formUsuario.get(fieldName);

    if (field?.hasError('required')) {
      return 'Campo de preenchimento obrigatório.';
    }

    if (field?.hasError('minlength')) {
      const requiredLength: number = field.errors
        ? field.errors['minlength']['requiredLength']
        : 3;
      return `Tamanho mínimo precisa ser de ${requiredLength} caracteres.`;
    }

    if (field?.hasError('maxlength')) {
      const requiredLength: number = field.errors
        ? field.errors['maxlength']['requiredLength']
        : 200;
      return `Tamanho máximo permitido de ${requiredLength} caracteres.`;
    }

    if (field?.hasError('email')) {
      return `Informe um e-mail válido.`;
    }

    return 'Campo inválido';
  }
}
