import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Usuario } from '../../model/usuario';

@Component({
  selector: 'app-usuarios-list',
  templateUrl: './usuarios-list.component.html',
  styleUrls: ['./usuarios-list.component.scss']
})
export class UsuariosListComponent implements OnInit {

  @Input() usuarios: Usuario[] = [];
  @Output() add = new EventEmitter(false);

  readonly displayedColumns = ['login', 'nome', 'email', 'perfil', 'senha', 'actions'];

  constructor() { }

  ngOnInit(): void {
  }

  onAdd() {
    this.add.emit(true);
  }

}
