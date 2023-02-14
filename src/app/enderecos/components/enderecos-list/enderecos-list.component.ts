import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Endereco } from '../../model/endereco';

@Component({
  selector: 'app-enderecos-list',
  templateUrl: './enderecos-list.component.html',
  styleUrls: ['./enderecos-list.component.scss'],
})
export class EnderecosListComponent implements OnInit {
  @Input() enderecos: Endereco[] = [];
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);
  @Output() remove = new EventEmitter(false);

  readonly displayedColumns = [
    'login',
    'logradouro',
    'numero',
    'complemento',
    'bairro',
    'cep',
    'cidade',
    'uf',
    'actions',
  ];

  constructor() {}

  ngOnInit(): void {}

  onAdd() {
    this.add.emit(true);
  }

  onEdit(endereco: Endereco) {
    this.edit.emit(endereco);
  }

  onDelete(endereco: Endereco) {
    this.remove.emit(endereco);
  }
}
