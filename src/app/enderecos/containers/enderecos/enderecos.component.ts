import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

import { Endereco } from '../../model/endereco';
import { EnderecosService } from '../../service/enderecos.service';

@Component({
  selector: 'app-enderecos',
  templateUrl: './enderecos.component.html',
  styleUrls: ['./enderecos.component.scss'],
})
export class EnderecosComponent implements OnInit {
  enderecos$: Observable<Endereco[]> | null = null;

  constructor(
    private EnderecosService: EnderecosService,
    public dialog: MatDialog,
    public router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.refresh();
  }

  refresh() {
    this.enderecos$ = this.EnderecosService.list().pipe(
      catchError((error) => {
        this.onError('Erro no carregamento dos usuários.');
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

  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onEdit(endereco: Endereco) {
    this.router.navigate(['edit', endereco._id], { relativeTo: this.route });
  }

  onRemove(endereco: Endereco) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja excluir este endereço?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.EnderecosService.remove(endereco._id).subscribe(
          () => {
            this.refresh();
            this.snackBar.open('Endereço excluído com sucesso!', 'X', {
              duration: 2500,
              verticalPosition: 'top',
              horizontalPosition: 'center',
            });
          },
          () => this.onError('Erro ao tentar excluir o endereço.')
        );
      }
    });
  }
}
