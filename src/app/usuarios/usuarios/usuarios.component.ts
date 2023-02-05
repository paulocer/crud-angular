import { UsuariosService } from './../services/usuarios.service';
import { Usuario } from './../model/usuario';
import { Component, OnInit } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  usuarios$: Observable<Usuario[]>;
  displayedColumns = ['login', 'nome', 'email', 'perfil', 'senha', 'actions'];

  // UsuariosService: UsuariosService;

  constructor(
    private UsuariosService: UsuariosService,
    public dialog: MatDialog,
    public router: Router,
    private route: ActivatedRoute

  ) {
    // this.usuarios = [];
    // this.UsuariosService = new UsuariosService();
    this.usuarios$ = this.UsuariosService.list()
      .pipe(
        catchError(error => {
          this.onError('Erro no carregamento dos usuários.')
          return of([])
        })
      );
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  ngOnInit(): void {

  }

  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

}
