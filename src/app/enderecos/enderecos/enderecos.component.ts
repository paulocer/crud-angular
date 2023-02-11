import { ErrorDialogComponent } from './../../shared/components/error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable, catchError, of } from 'rxjs';
import { EnderecosService } from './../service/enderecos.service';
import { Endereco } from './../model/endereco';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-enderecos',
  templateUrl: './enderecos.component.html',
  styleUrls: ['./enderecos.component.scss'],
})
export class EnderecosComponent implements OnInit {
  enderecos$: Observable<Endereco[]>;
  displayedColumns = [
    'login',
    'logradouro',
    'numero',
    'complemento',
    'bairro',
    'cep',
    'cidade',
    'uf',
  ];

  constructor(
    private enderecosService: EnderecosService,
    public dialog: MatDialog
  ) {
    this.enderecos$ = this.enderecosService.list().pipe(
      catchError((error) => {
        this.onError('Erro no carregamento dos endereços.');
        return of([]);
      })
    );
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }

  ngOnInit(): void {}
}
