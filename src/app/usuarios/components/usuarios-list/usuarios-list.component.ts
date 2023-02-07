import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Usuario } from '../../model/usuario';

@Component({
  selector: 'app-usuarios-list',
  templateUrl: './usuarios-list.component.html',
  styleUrls: ['./usuarios-list.component.scss'],
})
export class UsuariosListComponent implements OnInit {
  @Input() usuarios: Usuario[] = [];
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);
  @Output() remove = new EventEmitter(false);

  readonly displayedColumns = [
    'login',
    'nome',
    'email',
    'perfil',
    'senha',
    'actions',
  ];

  constructor() {}

  ngOnInit(): void {}

  onAdd() {
    this.add.emit(true);
  }

  onEdit(usuario: Usuario) {
    this.edit.emit(usuario);
  }

  onDelete(usuario: Usuario) {
    this.remove.emit(usuario);
  }
}
