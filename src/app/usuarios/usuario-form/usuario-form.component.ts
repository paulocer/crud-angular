import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.scss']
})

export class UsuarioFormComponent implements OnInit {

  formUsuario: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formUsuario = this.formBuilder.group({
      login: [null],
      nome: [null],
      email: [null],
      perfil: [null],
      senha: [null],
    })
  }

  ngOnInit(): void {

  }

  onSubmit() {

  }

  onCancel() {

  }
}
